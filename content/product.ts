import type { SpecGroup } from "@/components/blocks";

/**
 * Core product data for the flagship BESS platform.
 * Hero range values are representative of the deployed Eneon fleet;
 * figures should still be reconciled against the published data sheet
 * before a marketing freeze.
 */

export const product = {
  name: "Eneon BESS",
  tagline: "A modular battery energy storage platform.",
  description:
    "A containerized, augmentation-ready battery energy storage platform engineered for long service life. From sub-megawatt commercial systems to multi-megawatt utility deployments.",
  heroStats: [
    { label: "Energy Range", value: "0.5", unit: "–26 MWh" },
    { label: "Power Range", value: "250", unit: "kW–6 MW" },
    { label: "Service Life", value: "20", unit: "yr" },
    { label: "Chemistry", value: "LFP", unit: "" },
  ],
  pillars: [
    {
      number: "01",
      title: "Containerized & deployment-ready",
      description:
        "Fully-integrated outdoor enclosures ship pre-commissioned and arrive ready for interconnection and energization.",
    },
    {
      number: "02",
      title: "Modular & augmentation-ready",
      description:
        "DC-block architecture lets you add capacity over the system lifetime without replacing the full stack.",
    },
    {
      number: "03",
      title: "Transparent operation",
      description:
        "Every cell, every module, every rack — observable in real time through Eneon Connect.",
    },
    {
      number: "04",
      title: "Safety-certified",
      description:
        "UL 9540, UL 9540A fire tested, IEC 62619 / 62933, and NFPA 855 compliant installation design.",
    },
  ],
  specs: [
    {
      heading: "System",
      rows: [
        { label: "Configuration", value: "Containerized, outdoor-rated" },
        { label: "Cell Chemistry", value: "LFP (Lithium Iron Phosphate)" },
        { label: "Nominal DC Voltage", value: "1,500 V" },
        {
          label: "Operating Temperature",
          value: "−30°C to +50°C",
          note: "With integrated HVAC and thermal management",
        },
        { label: "Enclosure Rating", value: "IP54 / NEMA 3R" },
      ],
    },
    {
      heading: "Energy & Power",
      rows: [
        { label: "Capacity Range", value: "0.5 MWh – 26 MWh per site" },
        { label: "Power Range", value: "250 kW – 6 MW per site" },
        {
          label: "Round-trip Efficiency",
          value: "≥ 88%",
          note: "AC-side, measured at rated power",
        },
        {
          label: "Cycle Life",
          value: "6,000 cycles",
          note: "At 80% depth of discharge, end-of-life 70% capacity",
        },
        { label: "Service Life", value: "20 years" },
      ],
    },
    {
      heading: "Safety & Compliance",
      rows: [
        { label: "Product Safety", value: "UL 9540" },
        { label: "Fire Propagation", value: "UL 9540A tested" },
        { label: "Cell Safety", value: "IEC 62619" },
        { label: "System Performance", value: "IEC 62933" },
        { label: "Installation Code", value: "NFPA 855" },
      ],
    },
    {
      heading: "Interfaces",
      rows: [
        {
          label: "Monitoring",
          value: "Eneon Connect",
          note: "Cell-level telemetry, remote dispatch, cloud + on-prem",
        },
        {
          label: "Grid Interconnection",
          value: "String or central inverter",
          note: "Configured per project with qualified inverter partners",
        },
        { label: "Communications", value: "Modbus TCP, DNP3, IEC 61850" },
      ],
    },
  ] as SpecGroup[],
};

export const connect = {
  name: "Eneon Connect",
  tagline: "Every cell. Every moment. Observable.",
  description:
    "The software layer that ships with every Eneon BESS. Real-time telemetry, remote dispatch, and a cell-level view of system health — on the cloud or on your own infrastructure.",
  modules: [
    {
      number: "01",
      title: "Monitor",
      description:
        "Cell-level telemetry streamed in real time. Every voltage, temperature, and state-of-charge reading, visible from anywhere.",
    },
    {
      number: "02",
      title: "Dispatch",
      description:
        "Send commands to the system remotely. Schedule charge / discharge, respond to grid signals, or hand off to an EMS.",
    },
    {
      number: "03",
      title: "Analyze",
      description:
        "Historical performance, cycle counts, augmentation forecasting, and warranty tracking — exported or API-accessible.",
    },
    {
      number: "04",
      title: "Alert",
      description:
        "Rules-based and anomaly-detection alerting. Email, SMS, or webhook into your existing operations stack.",
    },
  ],
};
