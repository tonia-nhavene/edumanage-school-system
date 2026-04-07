import { useState, useMemo } from 'react';

export const useStudentData = (initialStudents = []) => {
  const [students, setStudents] = useState(initialStudents);

  const calculateStats = (studentsList = students) => {
    return {
      totalStudents: studentsList.length,
      averageMark: studentsList.length > 0 
        ? Math.round(studentsList.reduce((sum, s) => sum + s.mark, 0) / studentsList.length)
        : 0,
      averageAttendance: studentsList.length > 0
        ? Math.round(studentsList.reduce((sum, s) => sum + s.attendance, 0) / studentsList.length)
        : 0,
      atRiskCount: studentsList.filter(s => s.mark < 50).length
    };
  };

  const getSubjectStats = (studentsList = students) => {
    const subjectStats = {};
    studentsList.forEach(student => {
      const subject = student.subject || 'Unknown';
      if (!subjectStats[subject]) {
        subjectStats[subject] = { distinction: 0, merit: 0, pass: 0, fail: 0 };
      }
      if (student.mark >= 70) subjectStats[subject].distinction++;
      else if (student.mark >= 60) subjectStats[subject].merit++;
      else if (student.mark >= 50) subjectStats[subject].pass++;
      else subjectStats[subject].fail++;
    });
    return subjectStats;
  };

  const getFilteredStudents = (studentsList = students, filters = {}) => {
    if (!studentsList || !Array.isArray(studentsList)) {
      return [];
    }

    return studentsList.filter(student => {
      if (filters.subject && filters.subject.trim() !== '') {
        const matchesSearch = 
          student.name.toLowerCase().includes(filters.subject.toLowerCase()) ||
          student.subject.toLowerCase().includes(filters.subject.toLowerCase());
        if (!matchesSearch) return false;
      }

      if (filters.grade && filters.grade !== '') {
        if (student.grade !== filters.grade) return false;
      }

      return true;
    });
  };

  const getUniqueGrades = (studentsList = students) => {
    if (!studentsList || !Array.isArray(studentsList)) return [];
    const grades = studentsList.map(student => student.mark);
    return [...new Set(grades)].sort((a, b) => b - a);
  };

  const stats = useMemo(() => calculateStats(), [students]);
  const subjectStats = useMemo(() => getSubjectStats(), [students]);

  return {
    students,
    setStudents,
    stats,
    subjectStats,
    calculateStats,
    getSubjectStats,
    getFilteredStudents,
    getUniqueGrades
  };
};