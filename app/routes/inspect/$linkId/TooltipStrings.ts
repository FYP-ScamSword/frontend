export const combolevelsquattingTooltip = "Levelsquatting & Combosquatting are variations of cybersquatting.\
Levelsquatting uses a targeted company's domain name as a subdomain, while combosquatting combines popular \
trademarks with words such as 'verification', 'payment', 'security'. Both of these are similar in terms of \
the fact that both commonly use the trademark of the targeted company directly within the URL.";

export const dgaTooltip = "Phishing sites make use of domain generation algorithm (DGA) because \
these domains are randomly generated (and may only be up for a short amount of time) \
which makes it extremely difficult to block them using traditional methods like blacklists. \
Domains and subdomains with relatively high entropy are often indicators of malicious behavior."

export const typobitsquattingTooltip = "Bitsquatting & Typosquatting are variations of cybersquatting. \
Typosquatting are misspelt variants of target domain names that makes use of the possibility that users \
may make typing mistakes or think that they are visiting the legitimate site. Bitsquatting is also similar, \
where domains have a character that differs by one bit."

export const homographsquattingTooltip = "Homographsquatting is the most common type of cybersquatting that is abused, \
accounting for almost 70% of all cybersquatting sites. It makes use of the fact that some homoglyphs look almost exactly \
like a legitimate character, so unknowing users may be deceived visit the site. \
An example is https://microsoꬵt[.]com which is not actually https://microsoft[.]com. \
The f in this case, is a homoglyph in the former."

export const keywordBlacklistTooltip = "Certain keywords are often used in combination with trademarks. \
It is a technique commonly used in combosquatting (a type of cybersquatting). \
As an additional check, we have a list of commonly-abused keywords in phishing sites such as: 'installment', \
'security', 'secure', 'mailer', 'bet', etc."

export const substringTooltip = "Phishing sites often have have an abnormal length of characters \
for their subdomain/domain/path in an attempt to use a company's trademark within their URL so that \
they may pass off as a legitimate site, or because of entropy in DGA domains."

export const webriskTooltip = "This flag calls Google's Web Risk API which checks URLs against Google's constantly \
updated lists of unsafe web resources such as social engineering sites (phishing and deceptive sites) and sites that \
host malware or unwanted software."

export const safebrowsingTooltip = "This flag calls Google's Safe Browsing Lookup API which checks URLs against \
Google's constantly updated lists of unsafe web resources such as social engineering sites (phishing and deceptive sites) \
and sites that host malware or unwanted software."

export const registrationperiodTooltip = "Most legitimate sites will register their domains a few years in advance to ensure \
the availability of the URL, since it will often contain the company's brand name. Additionally, they will also register for \
at least a few years, while phishing sites who buy their own domains to host their website usually only register for a year \
as the site is not meant to be long-lived."

export const domainAgeTooltip = "Phishing sites usually do not live for a long time. Majority of them will go down within a \
day or a week, though some will live for a longer period of time (up to 30 days or longer). \
On the other hand, legitimate sites are usually much older. This flag will flag the domain if it is less \
than 30 days old. However, if it was hosted as a subdomain of a legitimate domain, then this check will not be \
able to provide much information in terms of how old the suspicious link is."

export const redirectionTooltip = "Phishing sites make use of shortening services like bit.ly, s.id, tiny.url, etc, to hide \
their suspicious links. Links are often shortened multiple times ( 4 and above times). \
However, legitimate sites often only shorten their URL once. \
This particular flag flags if the URL is being redirected more than 2 times."