import React from 'react';
import './GradeAnalysis.css';

export default function GradeAnalysis({
  students,
  calculateStats,
  classifyMark,
  getMarkColour
}) {
  const stats = calculateStats();
  const sortedStudents = [...students].sort((a, b) => b.mark - a.mark);

  const distinctions = students.filter(s => s.mark >= 80);
  const merits = students.filter(s => s.mark >= 70 && s.mark < 80);
  const passes = students.filter(s => s.mark >= 60 && s.mark < 70);
  const symbolE = students.filter(s => s.mark >= 50 && s.mark < 60);
  const fails = students.filter(s => s.mark < 50);

  return (
    <div className="module grade-analysis">
      <h2> Grade Analysis</h2>

      {/* Class Average */}
      <div className="average-container">
        <h3>Class Average Mark: <span className="average-value">{stats.averageMark}%</span></h3>
      </div>

      {/* Grade Distribution */}
      <div className="grade-distribution">
        <div className="grade-category distinction">
          <h4>Outstanding (80%+)</h4>
          <p className="count">{distinctions.length} students</p>
        </div>
        <div className="grade-category merit">
          <h4> Meritorious (70-79%)</h4>
          <p className="count">{merits.length} students</p>
        </div>
        <div className="grade-category pass">
          <h4> Substantial (60-69%)</h4>
          <p className="count">{passes.length} students</p>
        </div>
        <div className="grade-category symbole">
          <h4>  Adequate (50-59%)</h4>
          <p className="count">{symbolE.length} students</p>
        </div>
        <div className="grade-category fail">
          <h4> Fail (&lt;50%)</h4>
          <p className="count">{fails.length} students</p>
        </div>
      </div>

      {/* Leaderboard */}
      {sortedStudents.length > 0 ? (
        <div className="leaderboard-container">
          <h3>Mark Leaderboard</h3>
          <div className="leaderboard">
            {sortedStudents.map((student, index) => (
              <div key={student.id} className="leaderboard-item">
                <div className="rank">#{index + 1}</div>
                <div className="student-info">
                  <div className="name">{student.name}</div>
                  <div className="subject-grade">{student.subject} • {student.grade}</div>
                </div>
                <div className="mark-bar">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${student.mark}%`,
                      backgroundColor: getMarkColour(student.mark)
                    }}
                  ></div>
                </div>
                <div className="mark-value">
                  {student.mark}% <span className="classification">{classifyMark(student.mark)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty-message">No students added yet.</p>
      )}
    </div>
  );
}