export interface Student {
  id: string;
  name: string;
  department: string;
  gender: "Male" | "Female";
  attendance: number;
  studyHours: number;
  internal: number;
  previous: number;
  risk: number;
  band: PerformanceBand;
}

export type PerformanceBand = "Excellent" | "Good" | "Average" | "Needs Improvement";

const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Management"];
const FIRST = [
  "Aarav",
  "Diya",
  "Rohan",
  "Isha",
  "Kabir",
  "Ananya",
  "Vihaan",
  "Meera",
  "Arjun",
  "Sara",
  "Nikhil",
  "Tara",
];
const LAST = ["Sharma", "Iyer", "Nair", "Verma", "Reddy", "Khan", "Patel", "Bose"];

function bandFor(score: number): PerformanceBand {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Average";
  return "Needs Improvement";
}

export function bandColor(band: PerformanceBand) {
  switch (band) {
    case "Excellent":
      return "bg-accent/15 text-accent border-accent/30";
    case "Good":
      return "bg-primary/12 text-primary border-primary/30";
    case "Average":
      return "bg-warning/15 text-warning border-warning/30";
    default:
      return "bg-destructive/12 text-destructive border-destructive/30";
  }
}

// Deterministic pseudo random so SSR and client agree.
function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const STUDENTS: Student[] = Array.from({ length: 64 }, (_, i) => {
  const attendance = Math.round(55 + rand(i + 1) * 44);
  const studyHours = Math.round((1 + rand(i + 21) * 6) * 10) / 10;
  const internal = Math.round(40 + rand(i + 41) * 58);
  const previous = Math.round(38 + rand(i + 61) * 60);
  const score = Math.round(attendance * 0.35 + internal * 0.35 + previous * 0.2 + studyHours * 2);
  return {
    id: `STU-${(1000 + i).toString()}`,
    name: `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`,
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    gender: i % 2 === 0 ? "Male" : "Female",
    attendance,
    studyHours,
    internal,
    previous,
    risk: Math.max(2, Math.min(98, 100 - score)),
    band: bandFor(Math.min(99, score)),
  };
});

export const KPIS = {
  totalStudents: STUDENTS.length,
  averageMarks: Math.round(STUDENTS.reduce((a, s) => a + s.internal, 0) / STUDENTS.length),
  accuracy: 94.2,
  atRisk: STUDENTS.filter((s) => s.band === "Needs Improvement").length,
};

export const TREND = [
  { month: "Jan", predicted: 68, actual: 65, attendance: 78 },
  { month: "Feb", predicted: 71, actual: 69, attendance: 80 },
  { month: "Mar", predicted: 74, actual: 73, attendance: 83 },
  { month: "Apr", predicted: 72, actual: 74, attendance: 81 },
  { month: "May", predicted: 78, actual: 77, attendance: 86 },
  { month: "Jun", predicted: 82, actual: 80, attendance: 89 },
];

export const DISTRIBUTION = [
  { name: "Excellent", value: STUDENTS.filter((s) => s.band === "Excellent").length },
  { name: "Good", value: STUDENTS.filter((s) => s.band === "Good").length },
  { name: "Average", value: STUDENTS.filter((s) => s.band === "Average").length },
  { name: "Needs Improvement", value: KPIS.atRisk },
];

export const DEPARTMENT_STATS = DEPARTMENTS.map((d) => {
  const rows = STUDENTS.filter((s) => s.department === d);
  return {
    department: d.split(" ")[0],
    average: Math.round(rows.reduce((a, s) => a + s.internal, 0) / rows.length),
    attendance: Math.round(rows.reduce((a, s) => a + s.attendance, 0) / rows.length),
  };
});

export const RADAR_PROFILE = [
  { factor: "Attendance", value: 88 },
  { factor: "Study Hours", value: 72 },
  { factor: "Assignments", value: 91 },
  { factor: "Participation", value: 66 },
  { factor: "Wellbeing", value: 58 },
  { factor: "Internals", value: 79 },
];

export const FEATURE_IMPORTANCE = [
  { feature: "Attendance %", impact: 30 },
  { feature: "Study Hours", impact: 25 },
  { feature: "Assignments", impact: 18 },
  { feature: "Internal Marks", impact: 12 },
  { feature: "Stress Level", impact: -9 },
  { feature: "Sleep Hours", impact: 6 },
];

export const RECENT_PREDICTIONS = STUDENTS.slice(0, 8).map((s, i) => ({
  ...s,
  date: `2026-07-${(21 + (i % 7)).toString().padStart(2, "0")}`,
  confidence: 82 + ((i * 3) % 16),
}));

export interface Recommendation {
  title: string;
  detail: string;
  priority: "High" | "Medium" | "Low";
  timeline: "7 Days" | "30 Days" | "Semester";
  category: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    title: "Increase attendance above 90%",
    detail: "Current attendance is 78%. Attending 4 more sessions per month lifts predicted score by ~7 points.",
    priority: "High",
    timeline: "30 Days",
    category: "Attendance",
  },
  {
    title: "Study 2 extra hours daily",
    detail: "Focused evening blocks of 60 minutes with spaced repetition give the highest marginal gain.",
    priority: "High",
    timeline: "7 Days",
    category: "Study Habits",
  },
  {
    title: "Complete all pending assignments",
    detail: "3 assignments remain unsubmitted, contributing -18% to the current prediction.",
    priority: "High",
    timeline: "7 Days",
    category: "Coursework",
  },
  {
    title: "Reduce stress with weekly check-ins",
    detail: "Stress level is reported as high and negatively affects the model outcome by 9%.",
    priority: "Medium",
    timeline: "30 Days",
    category: "Wellbeing",
  },
  {
    title: "Improve sleep schedule to 7-8 hours",
    detail: "Sleep under 6 hours correlates with a 12% drop in internal assessment scores.",
    priority: "Medium",
    timeline: "30 Days",
    category: "Wellbeing",
  },
  {
    title: "Practice Mathematics fundamentals",
    detail: "Weakest subject cluster. Two problem sets per week recommended.",
    priority: "Medium",
    timeline: "Semester",
    category: "Subject",
  },
  {
    title: "Join peer mentoring sessions",
    detail: "Students in mentoring improved final marks by an average of 11 points.",
    priority: "Low",
    timeline: "Semester",
    category: "Support",
  },
];