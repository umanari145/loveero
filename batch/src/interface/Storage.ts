interface DataStorage {
  save(data: any): Promise<void>;
  load(): Promise<any>;
}