import type { ObjectId } from "mongodb";

export default class InspectedLink {
  constructor(
    public processed_url: String,
    public original_url: String,
    public status: String,
    public report: String,
    public image: String,
    public domain_age: Number,
    public flag_points: Number,
    public registrar_abuse_contact: String,
    public toFlag: Boolean,
    public _id?: ObjectId,
    ) {}
}
