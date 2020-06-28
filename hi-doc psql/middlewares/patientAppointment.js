const moment = require("moment");
const patientAptModel = require("../model/patientAppointment");
const { dp } = require("../model/doctorProfile");
const docAptModel = require("../model/doctorAppointment");
const patientProfile = require("../model/patientProfile");

const patientAptMiddlewares = {
  scheduleCheck: (req, res, next) => {
    console.log("entered schedule check");
    const regex = /^[1]?\d:[0 3]0-[1]?\d:[0 3]0$/;
    if (!moment(req.body.day).isValid())
      return res
        .status(400)
        .json({ error: "day should be in YYYY-MM-DD format" });
    if (!regex.test(req.body.timings))
      return res.status(400).json({
        error: "timings should be in '/^[1]?d:[0 3]0-[1]?d:[0 3]0$/' format",
      });
    const timings = req.body.timings;
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
    console.log("leaving schedule check");
    next();
  },
  isPatientBusy: async (req, res, next) => {
    try {
      console.log("entered is patient busy");
      const isBooked = await patientAptModel.findOne({
        where: {
          patientPhone: req.body.patientPhone,

          day: req.body.day,
          timings: req.body.timings,

          appointmentRequest: true,
        },
      });
      if (isBooked)
        return res.status(400).json({
          error: "patient alrready have an appointment in this timing",
        });
      console.log("leaving is patient busy");
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  isDocAvailable: async (req, res, next) => {
    try {
      console.log("is doc available");
      var specificDoc = await dp.findOne({
        where: {
          registrationId: req.body.registrationId,
        },
      });
      // console.log("SD:", specificDoc);
      // console.log("day searching for: ", req.body.day);
      // console.log(specificDoc.dataValues);
      // console.log(specificDoc.dataValues.availability);
      var isDayAvailable = specificDoc.dataValues.availability.find((i) => {
        if (i.day == req.body.day) {
          // console.log(i);
          return i;
        }
      });
      // console.log("dayAvail:", isDayAvailable);
      if (!isDayAvailable)
        return res
          .status(400)
          .json({ error: "Doctor is not available on the requested day" });
      else if (isDayAvailable) {
        var isSlotAvailable = specificDoc.dataValues.availability.find((i) => {
          if (
            i.day == req.body.day &&
            i.timings[req.body.timings] &&
            i.timings[req.body.timings] == true
          ) {
            // console.log(i);
            return i;
          }
        });
        // console.log("slotAvail:", isSlotAvailable);
        if (!isSlotAvailable)
          return res.json({
            error: "Doctor is not available in the particular timings",
          });
        else {
          isSlotAvailable.timings[req.body.timings] = false;
          // console.log(
          //   "status:",
          //   isSlotAvailable.timings[req.body.timings]
          // );
          // console.log(isSlotAvailable);
          // await specificDoc.save();
          // const index = specificDoc.availability.findIndex(i=>i==isSlotAvailable)
          // // console.log(index)
          // const updatedDocProfile = await dp.update(
          //   { "availability.timings": isSlotAvailable.timings },
          //   {
          //     where: {
          //       registrationId: req.body.registrationId,
          //       "availability.availabilityId": isSlotAvailable.availabilityId,
          //     },
          //   }
          // );
          const specDocProfile = await dp.findOne({
            where: {
              registrationId: req.body.registrationId,
            },
          });
          const index = specDocProfile.dataValues.availability.findIndex(
            (i) => i.day == isSlotAvailable.day
          );
          console.log("index: ", index);
          console.log(
            "after index",
            specDocProfile.dataValues.availability[index]
          );
          specDocProfile.dataValues.availability[index].timings =
            isSlotAvailable.timings;
          // const SavedDocProfile = await specDocProfile.save();
          const updatedDocProfile = await dp.update(
            { availability: specDocProfile.dataValues.availability },
            { where: { registrationId: req.body.registrationId } }
          );
          console.log(updatedDocProfile);
        }

        console.log("leaving is doc available");
        next();
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  createDocNewApt: async (req, res, next) => {
    try {
      console.log("entered creating new doc apt");
      const patient = await patientProfile.findOne({
        where: {
          phone: req.body.patientPhone,
        },
      });
      const doctorInfo = await dp.findOne({
        where: {
          registrationId: req.body.registrationId,
        },
      });
      const Schedule = {};
      Schedule.day = req.body.day;
      Schedule.timings = req.body.timings;
      const newDocApt = await docAptModel.create({
        doctorInfo: doctorInfo.dataValues,
        patientInfo: patient.dataValues,
        schedule: Schedule,
      });

      // const patientAppointment = req.patientApt.dataValues;
      const docResp = {};
      console.log(newDocApt.dataValues);
      docResp.status = newDocApt.dataValues.status;
      docResp.diagnosis = newDocApt.dataValues.diagnosis;
      docResp.prescription = newDocApt.dataValues.prescription;
      docResp.prognosis = newDocApt.dataValues.prognosis;
      req.docResponse = docResp;
      // await patientAppointment.save();
      console.log("leaving created doc apt");
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  isCancellingBeforeApt: async (req, res, next) => {
    try {
      const specificPatientApt = await patientAptModel.findOne({
        where: {
          patientAppointmentId: req.params.id,
        },
      });
      const day = specificPatientApt.dataValues.day;
      const timings = specificPatientApt.dataValues.timings;
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
      const specificPatientApt = await patientAptModel.findOne({
        where: { patientAppointmentId: req.params.id },
      });
      const Schedule = {};
      Schedule.day = specificPatientApt.dataValues.day;
      Schedule.timings = specificPatientApt.dataValues.timings;
      const specificPatientProfile = await patientProfile.findOne({
        where: {
          phone: specificPatientApt.dataValues.patientPhone,
        },
      });
      let specificDocProfile = await dp.findOne({
        where: {
          registrationId: specificPatientApt.dataValues.registrationId,
        },
      });
      let specificAvailability = specificDocProfile.dataValues.availability.find(
        (i) => i.day == specificPatientApt.dataValues.day
      );
      specificAvailability.availability.timings[
        specificPatientApt.dataValues.timings
      ] = true;
      await dp.update(
        { availability: specificAvailability },
        {
          where: {
            registrationId: specificPatientApt.dataValues.registrationId,
          },
        }
      );
      const removedDocApt = await docAptModel.destroy({
        where: {
          doctorInfo: specificDocProfile.dataValues,
          patientInfo: specificPatientProfile.dataValues,
          schedule: Schedule,
        },
      });
      res.json(req.updatedPatientApt);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = patientAptMiddlewares;
