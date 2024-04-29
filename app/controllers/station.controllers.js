const station = require("../models/station.model.js");
const bcrypt = require("bcrypt");

exports.getAllStationData = (req, res) => {
  station
    .find()
    .then((station) => {
      console.log(station);
      if (!station) {
        res.status(401).json({ message: "station not found" });
      } else {
        res.status(200).json({ message: "Success", data: station });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findStationData = (req, res) => {
  const id = req.params.id;

  station
    .findById(id)
    .then((stationData) => {
      if (!stationData) {
        res.status(401).json({ message: "station not found" });
      } else {
        res.status(200).json({ message: "Success", data: stationData });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.insertStationData = async (req, res) => {
  station
    .create({
      code: req.body.code,
      status: req.body.status,
      rfid: req.body.rfid,
    })
    .then((station) => {
      res.send({ message: "station inserted", data: station });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteStationData = (req, res) => {
  const id = req.params.id;

  station
    .findOneAndDelete(id)
    .then((stationData) => {
      res.status(200).json({ message: "station deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.updateStationData = (req, res) => {
  const id = req.params.id;

  station
    .findById(id)
    .then((stationData) => {
      if (!stationData) {
        res.status(401).json({ message: "station not found" });
      } else {
        stationData.code = req.body.code || stationData.code;
        stationData.rfid = req.body.rfid || stationData.rfid;
        stationData.status = req.body.status || stationData.status;

        stationData
          .save()
          .then((updatedstation) => {
            res
              .status(200)
              .json({
                message: "station data updated successfully",
                data: updatedstation,
              });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
