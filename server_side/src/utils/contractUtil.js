//multer
const path = require('path');
const fs = require('fs');
const loremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new loremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    },
    format: 'plain',
    suffix: '\n'
});

exports.generateContract = (partner, contract) => {
  // format contract create time
  const time = new Date(contract.createdAt);
  const formatTime = time.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
  const output = 
  `CONTRACT AGREEMENT

  CONTRACT INFORMATION:
  TIME OF EXECUTION: ${formatTime}
  CONTRACT TAX CODE: ${contract.taxCode}
  CONTRACT ACCESS CODE: ${contract.accessCode}
  DURATION: 1 YEAR

  PARTNER INFORMATION:
  PARTNER BRAND NAME: ${partner.brandName}
  PARTNER TAX CODE: ${partner.taxCode}
  PARTNER BANK ACCOUNT: ${partner.account.bankAccount}
  PARTNER REPRESENTATIVE: ${partner.representative}
  NUMBER OF BRANCHES: ${partner.branches.length}

  This contract is made and entered into by and between:

  - PARTNER REPRESENTATIVE: ${partner.representative} (hereinafter referred to as "Partner")
  - XYZ Corporation (hereinafter referred to as "Company")
  
  , effective as of the date of execution of this agreement.

  1. Services. Company agrees to provide Client with the following services (hereinafter referred to as the "Services"):

  ${lorem.generateParagraphs(3)}

  2. Payment. Client agrees to pay Company the sum of 1.000.000 VND (1 million vietnamdong) for the Services, payable as follows:

  ${lorem.generateParagraphs(1)}

  3. Term. The term of this agreement shall commence on ${formatTime} and shall takes effect upon confirmation of PARTNER, unless earlier terminated as provided herein.

  ${lorem.generateParagraphs(1)}

  4. Termination. Either party may terminate this agreement upon written notice to the other party.

  ${lorem.generateParagraphs(1)}

  5. Governing Law. This agreement shall be governed by and construed in accordance with the laws of Vietnam.

  ${lorem.generateParagraphs(1)}

  6. Entire Agreement. This agreement contains the entire agreement between the parties and supersedes all prior agreements and understandings, whether written or oral.

  ${lorem.generateParagraphs(1)}
  `;

  const fileName = `${partner.taxCode}.txt`;
  const filePath = path.join(__dirname, '..', '..', 'data', 'contracts', fileName);
  fs.writeFileSync(filePath, output);
}




