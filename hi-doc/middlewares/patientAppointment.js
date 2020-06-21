const moment = require("moment");
const patientAptModel = require("../model/patientAppointment");
const { doctorProfile } = require("../model/doctorProfile");
const docAptModel = require("../model/doctorAppointment");
const patientProfile = require("../model/patientProfile");

const patientAptMiddlewares = {
  scheduleCheck: (req, res, next) => {
    const regex = /^[1]?\d:[0 3]0-[1]?\d:[0 3]0$/;
    if (!moment(req.body.schedule.day).isValid())
      return res
        .status(400)
        .json({ error: "day should be in YYYY-MM-DD format" });
    if (!regex.test(req.body.schedule.timings))
      return res.status(400).json({
        error: "timings should be in '/^[1]?d:[0 3]0-[1]?d:[0 3]0$/' format",
      });
    const timings = req.body.schedule.timings;
    const arr = timings.split("-");
    const first = arr[0].split(":");
    const second = arr[1].split(":");
    const startHour = parseInt(first[0]);
    const startMin = parseInt(first[1]);
    const endHour = parseInt(second[0]);
    const endMin = parseInt(second[1]);

    if (
      !(
        (endHour - startHour == 1 && startMin - endMin == 30) ||
        (endHour - startHour == 0 && endMin - startMin == 30)
      )
    )
      return res
        .status(400)
        .json({ error: "schedule should be exactly half an hour" });
    next();
  },
  isPatientBusy: async (req, res, next) => {
    try {
      const isBooked = await patientAptModel.findOne({
        patientPhone: req.body.patientPhone,
        schedule: {
          day: req.body.schedule.day,
          timings: req.body.schedule.timings,
        },
        appointmentRequest: true,
      });
      if (isBooked)
        return res.status(400).json({
          error: "patient alrready have an appointment in this timing",
        });
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  isDocAvailable: async (req, res, next) => {
    try {
      let specificDoc = await doctorProfile.findOne({
        registrationId: req.body.registrationId,
      });
      console.log("SD:", specificDoc);
      let isDayAvailable = specificDoc.availability.find(
        (i) => i.day == req.body.schedule.day
      );
      console.log("dayAvail:", isDayAvailable);
      if (!isDayAvailable)
        return res
          .status(400)
          .json({ error: "Doctor is not available on the requested day" });
      else if (isDayAvailable) {
        let isSlotAvailable = specificDoc.availability.find((i) => {
          if (
            i.timings[req.body.schedule.timings] &&
            i.timings[req.body.schedule.timings] == true
          ) {
            return i;
          }
        });
        console.log("slotAvail:", isSlotAvailable);
        if (!isSlotAvailable)
          return res.json({
            error: "Doctor is not available in the particular timings",
          });
        else {
          isSlotAvailable.timings[req.body.schedule.timings] = false;
          await specificDoc.save();
        }
        next();
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  createDocNewApt: async (req, res, next) => {
    try {
      const patient = await patientProfile.findOne({
        phone: req.body.patientPhone,
      });
      const newDocApt = new docAptModel({
        patientInfo: patient._id,
        schedule: req.patientApt._id,
      });
      const savedDocApt = await newDocApt.save();
      const patientAppointment = req.patientApt;
      patientAppointment.doctorResponse = savedDocApt._id;
      await patientAppointment.save();
      res.status(200).json(patientAppointment);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  isCancellingBeforeApt: async (req, res, next) => {
    try {
      const specificPatientApt = await patientAptModel.findById(req.params.id);
      const day = specificPatientApt.schedule.day;
      const timings = specificPatientApt.schedule.timings;
      const startTime = timings.split("-")[0];
      const appointment = day + " " + startTime;
      if (moment(appointment, "YYYY-MM-DD HH:mm").isBefore(moment()))
        return res.status(400).json({
          error: "cannot update the appointment after appointment time",
        });
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  freeUpDoc: async (req, res, next) => {
    try {
      const specificPatientApt = await patientAptModel.findById(req.params.id);
      const specificPatientProfile = await patientProfile.findOne({
        phone: specificPatientApt.patientPhone,
      });
      let specificDocProfile = await doctorProfile.findOne({
        registrationId: specificPatientApt.registrationId,
      });
      let specificAvailability = specificDocProfile.availability.find(
        (i) => i.day == specificPatientApt.schedule.day
      );
      specificAvailability.availability.timings[
        specificPatientApt.schedule.timings
      ] = true;
      specificDocProfile.save();
      const removedDocApt = await docAptModel.deleteOne({
        patientInfo: { _id: specificPatientProfile._id },
        schedule: { _id: req.params.id },
      });
      res.json(req.updatedPatientApt);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = patientAptMiddlewares;