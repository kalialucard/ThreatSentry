// To run this script:
// npm run run:threat-intel -- <IP_ADDRESS>

import { config } from 'dotenv';
config();

// This is required to initialize Genkit and the plugins.
import '@/ai/genkit';

import { ipThreatAssessment } from '../flows/ip-threat-assessment';

async function main() {
  const ipAddress = process.argv[2];

  if (!ipAddress) {
    console.error(
      'Please provide an IP address as an argument.\n\nUsage: npm run run:threat-intel -- <IP_ADDRESS>'
    );
    process.exit(1);
  }

  console.log(`Running threat assessment for IP: ${ipAddress}`);

  try {
    const assessment = await ipThreatAssessment({ ipAddress });
    console.log('\nAssessment Complete:\n');
    console.log(JSON.stringify(assessment, null, 2));
  } catch (error) {
    console.error('\nAn error occurred during threat assessment:');
    // This will print the zod validation error in a more readable way
    if (error.cause?.issues) {
      console.error(JSON.stringify(error.cause.issues, null, 2));
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
