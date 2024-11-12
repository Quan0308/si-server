import { Document, Model, model, Schema } from 'mongoose';
export class BaseModel<T extends Document> {
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.model = model<T>(modelName, schema);
  }

  async create(data: any): Promise<T> {
    return await this.model.create(data);
  }

  async update(id: string, data: any): Promise<T> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updatedDocument) {
      throw new Error(`Document with id ${id} not found`);
    }
    return updatedDocument;
  }

  async delete(id: string): Promise<T> {
    const deletedDocument = await this.model.findByIdAndDelete(id);
    if (!deletedDocument) {
      throw new Error(`Document with id ${id} not found`);
    }
    return deletedDocument;
  }

  async findById(id: string): Promise<T> {
    const document = await this.model.findById(id);
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    return document;
  }

  async findOne(query: any): Promise<T> {
    const document = await this.model.findOne(query);
    if (!document) {
      throw new Error(`Document not found`);
    }
    return document;
  }

  async find(query: any): Promise<T[]> {
    return await this.model.find(query);
  }

  async count(query: any): Promise<number> {
    return await this.model.countDocuments(query);
  }
}
