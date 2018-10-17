'use strict';

// Thingy:52 specification
const config =
{
  'services': {
    'EnvironmentService': 'ef680200-9b35-4933-9b10-52ffa9740042',
    'UserInterfaceService': 'ef680300-9b35-4933-9b10-52ffa9740042',
    'MotionService': 'ef680400-9b35-4933-9b10-52ffa9740042',
    'SoundService': 'ef680500-9b35-4933-9b10-52ffa9740042'
  },

  'characteristics': {

    // NOTIFY
    // 2 bytes: int8_t: integer, uint8_t: decimal
    'temperature': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680201-9b35-4933-9b10-52ffa9740042',
      'unit': '°C'
    },

    // NOTIFY
    // 5 bytes: int32_t: integer, uint8_t: decimal
    'pressure': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680202-9b35-4933-9b10-52ffa9740042',
      'unit': 'hPa'
    },

    // NOTIFY
    // 1 byte: uint8_t: relative humidity
    'humidity': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680203-9b35-4933-9b10-52ffa9740042',
      'unit': '%'
    },

    // NOTIFY
    // Gas: 4 bytes
    // uint16_t: eCO2
    'gaseco2': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680204-9b35-4933-9b10-52ffa9740042',
      'unit': 'ppm'
    },

    // uint16_t: TVOC
    'gastvoc': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680204-9b35-4933-9b10-52ffa9740042',
      'unit': 'ppb'
    },

    // NOTIFY
    // 8 bytes: uint16_t: red, uint16_t: green, uint16_t: blue, uint16_t: clear
    'light': {
      'serviceUUID': 'ef680200-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680205-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // WRITE/READ
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
    'led': {
      'serviceUUID': 'ef680300-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680301-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // NOTIFY
    // 1 byte: 0x00 -> released, 0x01 -> pressed
    'button': {
      'serviceUUID': 'ef680300-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680302-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // NOTIFY
    // 12 bytes: float: x, float: y, float: z
    'gravityvector': {
      'serviceUUID': 'ef680400-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef68040a-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // WRITE/READ
    // 2 bytes: uint8_t speaker mode (0x03 for sample), uint8_t microphone mode (0x01-02)
    'speakerconfig': {
      'serviceUUID': 'ef680500-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680501-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // WRITE
    // max 273 bytes
    // if speaker config -> speaker mode is set to "sample" (0x03)
    // 1 byte: uint8_t (0x00-08) -> 2x collect point, 2x explosion, hit, 2x pickup, 2x shoot
    'speakerdata': {
      'serviceUUID': 'ef680500-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680502-9b35-4933-9b10-52ffa9740042',
      'unit': ''
    },

    // NOTIFY
    // 8 bytes
    // uint32_t: steps, uint32_t: time [ms]
    'stepcounter': {
      'serviceUUID': 'ef680400-9b35-4933-9b10-52ffa9740042',
      'characteristicUUID': 'ef680405-9b35-4933-9b10-52ffa9740042',
      'unit': 'steps'
    }
  }
};

export default config;
