#!/usr/bin/env node

import { DEFAULT_CONFIGS } from "@tck-training/excel-parser";
import { Command, Option } from "commander";
import { version } from "../package.json";
import { ics } from "./actions/ics";
import { print } from "./actions/print";

const program = new Command();

program.name("tck").description("TCK Training CLI tool").version(version);

// Helper function to add common options to commands
const addCommonOptions = (command: Command) => {
  return command
    .argument("<file>", "Excel file to parse")
    .addOption(
      new Option("-c, --config <name>", "Name of the config to use")
        .choices(Object.keys(DEFAULT_CONFIGS))
        .makeOptionMandatory()
    )
    .option("-p, --player <name>", "Player name");
};

// Create commands with shared options
addCommonOptions(program.command("print"))
  .description("print the training calendar on the console")
  .action(print);

addCommonOptions(program.command("ics"))
  .description("create an ics file from the training calendar")
  .action(ics);

program.parse();
