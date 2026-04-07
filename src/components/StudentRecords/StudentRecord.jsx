import React from 'react';
import './StudentRecord.css';

export default function StudentRecords({
  students =[],
  formData ={name: '', grade: '', subject: '', mark: '', attendance: '' },
  editingId,
  searchTerm='',
  filterGrade = '',
  errors ={},
  handleInputChange,
  handleSubmit,
  handleEdit,
  handleDelete,
  handleCancel,
  setSearchTerm,
  setFilterGrade,
  getFilteredStudents,
  getStatus,
  getUniqueGrades
}) {
    


  const safeStudents = students || [];

  const filteredStudents = getFilteredStudents(safeStudents, { 
    subject: searchTerm, 
    grade: filterGrade 
  }).filter(Boolean); 

  const uniqueGrades = getUniqueGrades(safeStudents);

  // {
  // // Safety check
  // if (!formData || !formData.name) {
  //   return <div className="module student-records"><p>Loading...</p></div>;
  // }
  // }


  
  // const filteredStudents = getFilteredStudents(students, { subject: searchTerm, grade: filterGrade });
  // const uniqueGrades = getUniqueGrades(students);

  return (
    <div className="module student-records">
      <h2>Student Records</h2>

      {/* Form Section */}
      <div className="form-container">
        <h3>{editingId ? 'Edit Student' : 'Add New Student'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Grade *</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className={errors.grade ? 'input-error' : ''}
              >
                <option value="">Select Grade</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              {errors.grade && <span className="error-message">{errors.grade}</span>}
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g., Maths, English"
                className={errors.subject ? 'input-error' : ''}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mark (0-100) *</label>
              <input
                type="number"
                name="mark"
                value={formData.mark}
                onChange={handleInputChange}
                placeholder="0-100"
                min="0"
                max="100"
                className={errors.mark ? 'input-error' : ''}
              />
              {errors.mark && <span className="error-message">{errors.mark}</span>}
            </div>

            <div className="form-group">
              <label>Attendance (0-100) *</label>
              <input
                type="number"
                name="attendance"
                value={formData.attendance}
                onChange={handleInputChange}
                placeholder="0-100"
                min="0"
                max="100"
                className={errors.attendance ? 'input-error' : ''}
              />
              {errors.attendance && <span className="error-message">{errors.attendance}</span>}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="filter-select"
        >
          <option value="">All Grades</option>
          {uniqueGrades.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      {filteredStudents.length > 0 ? (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Mark</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.subject}</td>
                  <td>{student.mark}%</td>
                  <td>{student.attendance}%</td>
                  <td>
                    <span
                      className={`status ${getStatus(student.mark, student.attendance).toLowerCase()}`}
                    >
                      {getStatus(student.mark, student.attendance)}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(student)}
                      className="btn btn-edit"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-delete"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-message">
          {students.length === 0
            ? 'No students added yet.'
            : 'No students match your search or filter.'}
        </p>
      )}
    </div>
  );
}