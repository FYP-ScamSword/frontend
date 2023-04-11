export default class Dom {
  constructor(
    public url: string,
    public html: string,
    public suspicious_inputs: Array<string>,
    public xss_attempts: Array<Array<string>>,
    public similar_favicon: SimilarFavicon,
    public alive: boolean,
    public updated_at: string
  ) {}
}

class SimilarFavicon {
  constructor(
    public favicon_url: string,
    public similar_favicons: Array<Favicon>
  ) {}
}
class Favicon {
  constructor(
    public name: string,
    public url: string,
    public distance: number
  ) {}
}
