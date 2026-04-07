import React from 'react';
import './dashboard.css';

export default function Dashboard({ students, stats, subjectStats }) {
  
  // Safety checks
  const safeStats = stats || {};
  const safeSubjectStats = subjectStats || {};



  // if (!safeStats || Object.keys(safeStats).length === 0) {
  //   return (
  //     <div className="module dashboard">
  //       <h2> Dashboard</h2>
  //       <p>Loading dashboard...</p>
  //     </div>
  //   );
  // }
  
  
  return (
    <div className="module dashboard">
      <h2> Dashboard</h2>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-value">{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Mark</h3>
          <p className="stat-value">{safeStats.averageMark}%</p>
        </div>
        <div className="stat-card">
          <h3>Average Attendance</h3>
          <p className="stat-value">{safeStats.averageAttendance}%</p>
        </div>
        <div className="stat-card at-risk">
          <h3>At Risk</h3>
          <p className="stat-value">{safeStats.atRiskCount}</p>
        </div>
      </div>

      {/* Subject Performance Chart */}
      {Object.keys(safeSubjectStats).length > 0 && (
        <div className="chart-container">
          <h3>Subject Performance</h3>
          <div className="chart">
            {Object.entries(safeSubjectStats).map(([subject, data]) => (
              <div key={subject} className="chart-row">
                <div className="subject-label">{subject}</div>
                <div className="chart-bars">
                  <div
                    className="bar distinction"
                    style={{ width: `${data.distinction * 20}px` }}
                    title={`Distinction: ${data.distinction}`}
                  ></div>
                  <div
                    className="bar merit"
                    style={{ width: `${data.merit * 20}px` }}
                    title={`Merit: ${data.merit}`}
                  ></div>
                  <div
                    className="bar pass"
                    style={{ width: `${data.pass * 20}px` }}
                    title={`Pass: ${data.pass}`}
                  ></div>
                  <div
                    className="bar fail"
                    style={{ width: `${data.fail * 20}px` }}
                    title={`Fail: ${data.fail}`}
                  ></div>
                </div>
                <div className="chart-legend">
                  D:{data.distinction} M:{data.merit} P:{data.pass} F:{data.fail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {students.length === 0 && (
        <p className="empty-message">No students were added yet. Go to Student Records to add students.</p>
      )}
    </div>
  );
}