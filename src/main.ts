import { LinearClient } from "@linear/sdk";
import Conf from "conf";

import pkg from "../package.json";

interface Config {
  integrations: {
    linear: {
      apiKey: string;
      teamId: string;
    };
  };
}

async function main() {
  const config = new Conf<Config>({
    projectName: "com.cankinay." + pkg.name,
    projectVersion: pkg.version,
  });

  const team = config.get("team");

  console.log("config.store:", config.store);

  console.log(`Hello, ${team}!`);

  const linearClient = new LinearClient({
    apiKey:
      process.env.LINEAR_API_KEY ?? config.get("integrations.linear.apiKey"),
  });

  const states = await linearClient.workflowStates();

  console.log("states:", states.nodes);
}

main().catch(console.error);
