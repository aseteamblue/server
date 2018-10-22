import Thingy from '../models/thingy';


class dataManager {
  static async addRaw(thingyId, characteristic, value) {
    let msg = new Thingy({ device_id: thingyId, message_type: characteristic, data: value });
    msg.save();
    return 0;
  }
}

export default dataManager;
