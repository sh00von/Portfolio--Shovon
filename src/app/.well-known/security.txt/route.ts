import { NextResponse } from "next/server";

export async function GET() {
  const securityTxt = `# RFC 9116 Security Information for Md Minaruzzaman Shovon
Contact: mailto:minar.svn@gmail.com
Contact: https://shovon.bd/dev
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, bn
Canonical: https://shovon.bd/.well-known/security.txt
Policy: https://shovon.bd/security
Hiring: https://shovon.bd/dev
`;

  return new NextResponse(securityTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
