import React, { useState } from 'react';
import './App.css';
import NavbarDark from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';
import StudentRecords from './components/StudentRecords/StudentRecord';
import { useStudentData } from './hooks/useStudentData'; 
import GradeAnalysis from './components/GradeAnalysis/GradeAnalysis' ;
import AttendanceTracker from './components/attendenceTracker/attendenceTracker';

function App() {
  const { 
    students, 
    setStudents, 
    stats, 
    subjectStats, 
    getFilteredStudents, 
    getUniqueGrades 
  } = useStudentData([]);

  const [activeModule, setActiveModule] = useState('dashboard');

  // Form state
  const [formData, setFormData] = useState({ 
    name: '', 
    grade: '', 
    subject: '', 
    mark: '', 
    attendance: '' 
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.mark === '' || formData.mark < 0 || formData.mark > 100) newErrors.mark = 'Mark must be 0-100';
    if (formData.attendance === '' || formData.attendance < 0 || formData.attendance > 100) newErrors.attendance = 'Attendance must be 0-100';
    return newErrors;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingId) {
      // Update existing student
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      setEditingId(null);
    } else {
      // Add new student
      const newStudent = { ...formData, id: Date.now() };
      setStudents([...students, newStudent]);
    }

    setFormData({ name: '', grade: '', subject: '', mark: '', attendance: '' });
    setErrors({});
  };

  // Handle edit
  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
  };

  // Handle delete
  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ name: '', grade: '', subject: '', mark: '', attendance: '' });
    setEditingId(null);
    setErrors({});
  };

  // Get status
  const getStatus = (mark, attendance) => {
    if (mark < 50 || attendance < 75) return 'At Risk';
    if (mark >= 70 && attendance >= 90) return 'Excellent';
    if (mark >= 60 && attendance >= 80) return 'Good';
    return 'Average';
  };

  const classifyMark = (mark) => {
    if (mark >= 80) return 'Distinction';
    if (mark >= 70) return 'Merit';
    if (mark >= 60) return 'Pass';
    if (mark >= 50) return 'Adequate';
    return 'Fail';
  };

  const getMarkColour = (mark) => {
    if (mark >= 80) return '#27ae60';
    if (mark >= 70) return '#2980b9';
    if (mark >= 60) return '#f39c12';
    if (mark >= 50) return '#e67e22';
    return '#e74c3c';
  };

  const calculateStats = () => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        averageMark: 0,
        averageAttendance: 0,
        atRiskCount: 0
      };
    }

    const totalStudents = students.length;
    const averageMark = (
      students.reduce((sum, s) => sum + s.mark, 0) / totalStudents
    ).toFixed(2);
    const averageAttendance = (
      students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents
    ).toFixed(2);
    const atRiskCount = students.filter(
      s => s.mark < 50 && s.attendance < 70
    ).length;

    return { totalStudents, averageMark, averageAttendance, atRiskCount };
  };

  return (
    <div className="App">
       <header className="app-header">
      <h1>🎓 EduManage </h1>
        <h3>School Management System</h3>
      <p>Manage students, track performance and monitor attendance</p>
    </header>
    
      <NavbarDark activeModule={activeModule} setActiveModule={setActiveModule}/>

     <main className="app-main">
      {/* DASHBOARD PAGE */}
      {activeModule === 'dashboard' && (
        <Dashboard 
          students={students}
          calculateStats={calculateStats}
          subjectStats={subjectStats}
        />
      )}

      {/* STUDENT RECORDS PAGE */}
      {activeModule === 'records' && (
         <StudentRecords 
          students={students}
          formData={formData}
          editingId={editingId}
          searchTerm={searchTerm}
          filterGrade={filterGrade}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          setSearchTerm={setSearchTerm}
          setFilterGrade={setFilterGrade}
          getFilteredStudents={getFilteredStudents}
          getStatus={getStatus}
          getUniqueGrades={getUniqueGrades}
        />
      )}
      {/* GRADE ANALYSIS PAGE */}
      {activeModule === 'grades' && (
         <GradeAnalysis
          students={students}
          calculateStats={calculateStats}
          classifyMark={classifyMark}
          getMarkColour={getMarkColour}
        />
      )}

        {/* ATTENDANCE TRACKER PAGE */}
        {activeModule === 'attendance' && (
           <AttendanceTracker
            students={students}
            getAttendanceColour={(attendance) => {
              if (attendance >= 90) return '#27ae60';
              if (attendance >= 80) return '#2980b9';
              if (attendance >= 70) return '#f39c12';
              return '#e74c3c';
            }}
          />
        )}
     </main>
      
      <footer className="app-footer"> 
        <p>EduManage 2026| All rights reserved | School Management System</p>
        </footer>

    </div>
  );
}

export default App;
