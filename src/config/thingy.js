'use strict';

// Thingy:52 specification
const config =
{
  "services": {
    "EnvironmentService": "ef680200-9b35-4933-9b10-52ffa9740042",
    "UserInterfaceService": "ef680300-9b35-4933-9b10-52ffa9740042",
    "MotionService": "ef680400-9b35-4933-9b10-52ffa9740042",
    "SoundService": "ef680500-9b35-4933-9b10-52ffa9740042"
  },

  "characteristics":{

    // 2 bytes: int8_t: integer, uint8_t: decimal
    "temperature": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680201-9b35-4933-9b10-52ffa9740042",
      "unit": "°C"
    },

    // 5 bytes: int32_t: integer, uint8_t: decimal
    "pressure": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680202-9b35-4933-9b10-52ffa9740042",
      "unit": "hPa"
    },

    // 1 byte: uint8_t: relative humidity
    "humidity": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680203-9b35-4933-9b10-52ffa9740042",
      "unit": "%"
    },

    // Gas: 4 bytes
    // uint16_t: eCO2
    "gaseco2": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680204-9b35-4933-9b10-52ffa9740042",
      "unit": "ppm"
    },

    // uint16_t: TVOC
    "gastvoc": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680204-9b35-4933-9b10-52ffa9740042",
      "unit": "ppb"
    },

    // 8 bytes: uint16_t: red, uint16_t: green, uint16_t: blue, uint16_t: clear
    "light": {
      "serviceUUID": "ef680200-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680205-9b35-4933-9b10-52ffa9740042",
      "unit": ""
    },

    // max 5 bytes
    // 1st byte in every case: uint8_t: mode (0 -> off, 1 -> constant, 2 -> breathe, 3 -> oneshot)
    //
    // Constant mode:
    // # +3 bytes: uint8_t: red, uint8_t: green, uint8_t: blue (0-255)
    //
    // Breathe mode:
    // # +4 bytes: uint8_t: color (0x00-0x07), uint8_t: intensity (0-100), uint16_t: delay in ms (50-10000)
    //
    // Breathe mode:
    // # +2 bytes: uint8_t: color (0x00-0x07), uint8_t: intensity (0-100)
    "led": {
      "serviceUUID": "ef680300-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680301-9b35-4933-9b10-52ffa9740042",
      "unit": ""
    },

    // 1 byte: 0x00 -> released, 0x01 -> pressed
    "button": {
      "serviceUUID": "ef680300-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef680302-9b35-4933-9b10-52ffa9740042",
      "unit": ""
    },

    // 12 bytes: float: x, float: y, float: z
    "gravityvector": {
      "serviceUUID": "ef680400-9b35-4933-9b10-52ffa9740042",
      "characteristicUUID": "ef68040a-9b35-4933-9b10-52ffa9740042",
      "unit": ""
    }
  }
};

export default config;
