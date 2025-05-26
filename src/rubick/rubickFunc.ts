// // 创建请求
// rubick.db.put({
//     _id: "demo",
//     data: "demo"
//   })
//   // 返回 {id: "demo", ok: true, rev: "1-05c9b92e6f24287dc1f4ec79d9a34fa8"}

//   // 更新请求
//   rubick.db.put({
//     _id: "demo",
//     data: "demo",
//     _rev: "1-05c9b92e6f24287dc1f4ec79d9a34fa8"
//   })

// rubick.db.get("demo")
// 返回 {_id: "demo", _rev: "3-9836c5c68af5aef618e17d615882942a", data: "demo"}

class RubickFunc {
  private rubick: typeof window.rubick;
  // 启动器列表在数据库中的键名
  private readonly LAUNCHER_STORAGE_KEY = "lanxiuyun-launcher-list";

  constructor() {
    this.rubick = window.rubick;
  }

  /**
   * 保存启动器列表到数据库
   * @param newList 新的启动器列表数据
   */
  public saveLauncherList(newList: any[]) {
    try {
      const storedData = this.rubick.db.get(this.LAUNCHER_STORAGE_KEY);
      const revisionId = storedData._rev; // PouchDB 文档版本号

      this.rubick.db.put({
        _id: this.LAUNCHER_STORAGE_KEY,
        data: JSON.stringify(newList),
        _rev: revisionId,
      });
    } catch (error) {
      this.rubick.db.put({
        _id: this.LAUNCHER_STORAGE_KEY,
        data: JSON.stringify(newList),
      });
    }
  }

  /**
   * 从数据库获取启动器列表
   * @returns 启动器列表数据
   */
  public fetchLauncherList(): any[] {
    try {
      const storedData = this.rubick.db.get(this.LAUNCHER_STORAGE_KEY);
      return JSON.parse(storedData.data);
    } catch (error) {
      console.error("获取启动器列表失败", error);
      return [];
    }
  }
}

const rubickFunc = new RubickFunc();
export default rubickFunc;
