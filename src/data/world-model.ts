// Text and numbers for the world-model project page (/projects/world-model).
// Every number comes from the world-model repo: README.md, plans/stages/stage8.md,
// results/project3/camera_redraw/NOTES.md and results/project3/quant/compare_final.txt.

export type Stat = { value: string; label: string };

export type Part = { label: string; title: string; text: string };

export type Result = {
  headline: string;
  title: string;
  text: string;
  caveat?: string;
};

export type Figure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const worldModel = {
  title: "World model: a walking robot and a robot brain",
  description:
    "A from-scratch C++20 world model that teaches a simulated humanoid to walk, plus a robot brain built on the π0.5 vision-language-action model.",
  lede:
    "A neural network that predicts what happens next, written from scratch in C++20 (own matrix maths and neural nets, no Eigen), teaches a simulated 1.66 m humanoid to walk with far fewer real tries. A second part builds helpers around π0.5, a large robot \"brain\" that turns camera images and a sentence into arm motions.",
  tech: ["C++20", "MuJoCo", "Python", "PyTorch", "π0.5", "GitHub Actions"],
  // Set to the repo URL once it is public; the link is hidden while this is undefined.
  repo: undefined as string | undefined,

  stats: [
    { value: "~172×", label: "fewer real tries to learn to walk than PPO" },
    { value: "+16.5 pts", label: "π0.5 success when the camera has moved" },
    { value: "3.3 GB", label: "4-bit π0.5, down from 7.7 GB, no worse" },
    { value: "895", label: "automated tests (596 C++, 299 Python)" },
  ] satisfies Stat[],

  idea:
    "Robots learn by trying things, and real tries are slow and costly. A world model learns how the world responds (\"if I move my legs like this, where will I be?\"), so the robot can practise mostly inside its own imagination.",

  parts: [
    {
      label: "Part 1 · C++20",
      title: "Learning to walk",
      text: "Built bottom-up: matrices, a neural network, then world models, uncertainty from a group of 5 models, and planners. Proven first on a balancing cart-pole, then used to train a 12-motor biped in the MuJoCo physics simulator.",
    },
    {
      label: "Part 2 · Python",
      title: "A robot brain",
      text: "Takes π0.5 as it is (never retrained) and tests add-ons on LIBERO-Plus, simulated kitchen tasks with disturbances such as a moved camera or sensor noise. Rented GPUs for testing; everything else built and tested on a laptop first.",
    },
  ] satisfies Part[],

  walking: {
    headline: "64,000 vs 11.0 M",
    title: "Walking with ~172× fewer real tries",
    text: "The world-model trainer (MBPO) taught the humanoid to walk 10 m without falling after a mean of 64,000 real simulator steps. PPO, a standard method that learns from real tries only, needed 11.0 million. Five training runs each, all five walked.",
    caveat:
      "Honest caveat: the learner inside MBPO (SAC) is already ~61× better than PPO on its own; the world model adds ~2.7× on top. PPO is still faster in wall-clock hours.",
  } satisfies Result,

  figures: [
    {
      src: "/projects/world-model/mbpo_walk.gif",
      alt: "The simulated humanoid walking forward",
      caption: "The learned controller walking 18 m in 30 s.",
      width: 360,
      height: 270,
    },
    {
      src: "/projects/world-model/race.svg",
      alt: "Learning curves: MBPO reaches the walking goal with far fewer real steps than PPO",
      caption: "Real steps needed until each run first walked.",
      width: 826,
      height: 548,
    },
  ] satisfies Figure[],

  brainResults: [
    {
      headline: "57% → 73%",
      title: "Fixing a moved camera",
      text: "π0.5 fails more when the camera is not where it was during training. Redrawing the image as seen from the training spot (a view-synthesis network) raised success by 16.5 points on 115 fresh paired tasks (95% range +2.1 to +30.5).",
    },
    {
      headline: "81.7% → 83.2%",
      title: "A 4-bit π0.5 for a small robot computer",
      text: "Storing most weights in 4 bits cut running memory from 7.7 GB to 3.3 GB, aimed at an 8 GB Jetson Orin Nano Super. Over 630 paired tries it was not worse (+1.4 points, 95% range −2.7 to +6.2).",
      caveat:
        "Missed: the weights are 3.08 GB against a 2.8 GB goal, and each answer is 1.8× slower on a desktop GPU.",
    },
  ] satisfies Result[],

  built: [
    {
      lead: "From scratch where it counts.",
      text: "Matrix maths, layers, backpropagation and the Adam optimiser are written by hand, checked against numerical gradients.",
    },
    {
      lead: "Tested and checked on every push.",
      text: "596 C++ tests run with memory and undefined-behaviour checkers, and the build treats warnings as errors; a second job runs clang-tidy, ruff and shellcheck.",
    },
    {
      lead: "Honest statistics.",
      text: "Same seeds for every method, paired comparisons, 95% ranges, and goals written down before the results.",
    },
    {
      lead: "A learning website.",
      text: "Every part has a try-it page, notes, and a line-by-line step-through of the C++ code.",
    },
  ],

  limits: [
    "Simulation only so far; the real robot (Jetson Orin Nano Super + Raspberry Pi 5) is next.",
    "The from-scratch C++ imagination trainer only learned to stand; walking came from the Python MBPO trainer, judged by the C++ library.",
    "An early-warning study (spot failures before they happen) came out negative.",
    "The camera-redraw network is licensed for non-commercial use only.",
  ],
};
