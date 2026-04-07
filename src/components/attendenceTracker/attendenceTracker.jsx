import React from 'react';
import './attendenceTracker.css';

export default function AttendanceTracker({ students, getAttendanceColour }) {
  const sortedByAttendance = [...students].sort((a, b) => a.attendance - b.attendance);

  return (
    <div className="module attendance-tracker">
      <h2> Attendance Tracker</h2>

      {sortedByAttendance.length > 0 ? (
        <div className="attendance-list">
          {sortedByAttendance.map(student => {
            const isLowAttendance = student.attendance < 70;
            return (
              <div key={student.id} className={`attendance-item ${isLowAttendance ? 'alert' : ''}`}>
                <div className="attendance-header">
                  <div className="student-name">
                    {student.name}
                    {isLowAttendance && <span className="alert-icon">⚠️</span>}
                  </div>
                  <div className="attendance-percentage">{student.attendance}%</div>
                </div>
                <div className="attendance-bar-container">
                  <div
                    className="attendance-bar"
                    style={{
                      width: `${student.attendance}%`,
                      backgroundColor: getAttendanceColour(student.attendance)
                    }}
                  ></div>
                </div>
                <div className="attendance-meta">
                  <span className="grade">{student.grade}</span>
                  <span className="subject">{student.subject}</span>
                  {isLowAttendance && <span className="warning">Below 70% - Requires Attention</span>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-message">No students added yet.</p>
      )}
    </div>
  );
}