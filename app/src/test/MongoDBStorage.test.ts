import { StorageFactory } from "../infra/StorageFactory";

describe('DB', () => {
  let storage: any;

  // 各テストケースごとに実施
  beforeEach(async () => {
    storage = StorageFactory.getStorage();
  });

  // 各テストケースごとに実施
  afterEach(async () => {
    await storage.delete()
    await storage.close()
  });

  it('データ投入', async() => {
    const item ={
      'title': "hogehoge",
      'url': "http://www.yahoo.co.jp"
    };
    await storage.save(item)
    const data = await storage.load()
    expect(data.items[0].title).toBe('hogehoge')
    expect(data.items[0].url).toBe('http://www.yahoo.co.jp')
  }, 20000);

  it('複数データ投入', async() => {
    const items = [
      {
        'title': "hogehoge",
        'url': "http://www.yahoo.co.jp"
      },
      {
        'title': "hogehoge2",
        'url': "http://www.yahoo2.co.jp"
      }
    ];
    await storage.bulkSave(items)
    const data = await storage.load()
    expect(data.total).toBe(items.length);

    // ロードされたデータが保存したデータを含んでいることを確認
    expect(data.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'hogehoge',
          url: 'http://www.yahoo.co.jp',
        }),
        expect.objectContaining({
          title: 'hogehoge2',
          url: 'http://www.yahoo2.co.jp',
        }),
      ])
    );
  }, 20000);

})