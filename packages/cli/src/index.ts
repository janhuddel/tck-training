#!/usr/bin/env node

import { CoreService } from "@tck-training/core";
import { Command } from "commander";

const program = new Command();

program.name("tck").description("TCK Training CLI tool").version("0.0.1");

program
  .command("process")
  .description("Process data using the core service")
  .argument("<name>", "name of the data")
  .argument("<value>", "value to process")
  .action((name: string) => {
    const coreService = new CoreService();
    const result = coreService.greet(name);
    console.log("Greeting:", result);
  });

program.parse();
