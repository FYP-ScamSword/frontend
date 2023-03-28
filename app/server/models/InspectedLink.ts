export default class InspectedLink {
  constructor(
    public processed_url: string,
    public original_url: string,
    public status: string,
    public report: string,
    public image: string,
    public domain_age: Number,
    public flag_points: Number,
    public registrar_abuse_contact: string,
    public to_flag: Boolean,
    public num_flags: Number,
    public registration_period: Number,
    public dga_flag: Boolean,
    public redirections_flag: Boolean,
    public domain_age_flag: Boolean,
    public registration_period_flag: Boolean,
    public safe_browsing_flag: Boolean,
    public web_risk_flag: Boolean,
    public subdomain_len_flag: Boolean,
    public blacklisted_keyword_flag: Boolean,
    public homographsquatting_flag: Boolean,
    public typobitsquatting_flag: Boolean,
    public combolevelsquatting_flag: Boolean,
    public updatedAt: Date,
    public _id?: string


  ) {}
}
