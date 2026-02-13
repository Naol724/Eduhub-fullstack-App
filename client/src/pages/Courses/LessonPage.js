import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  PlayIcon,
  PauseIcon,
  BookOpenIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListBulletIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const LessonPage = () => {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.ui);

  const [activeTab, setActiveTab] = useState('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [notes, setNotes] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  // Extract lesson number from lessonSlug (e.g., "lesson-1" -> 1)
  const lessonNumber = parseInt(lessonSlug?.split('-')[1]) || 1;

  // Helper function to get course title based on slug
  function getCourseTitle(slug) {
    const courseTitles = {
      'complete-react-developer-2024': 'Complete React Developer Course 2024',
      'nodejs-express-backend-masterclass': 'Node.js & Express: Backend Development Masterclass',
      'data-science-python-zero-hero': 'Data Science with Python: From Zero to Hero',
      'ui-ux-design-fundamentals': 'UI/UX Design Fundamentals: Create Amazing User Experiences',
      'fullstack-javascript-mern-stack': 'Full-Stack JavaScript: MERN Stack Development',
      'flutter-mobile-app-development': 'Flutter Mobile App Development: iOS & Android',
      'frontend-react-typescript-masterclass': 'Frontend Development with React.js & TypeScript',
      'nextjs-typescript-fullstack-development': 'Next.js & TypeScript: Full-Stack Web Development',
      'php-laravel-backend-development': 'Backend Development with PHP & Laravel Framework',
      'bootstrap-tailwind-css-web-design': 'Bootstrap & Tailwind CSS: Modern Web Design',
      'complete-fullstack-developer-bootcamp-2024': 'Complete Full-Stack Developer Bootcamp 2024'
    };
    return courseTitles[slug] || 'Course Title';
  }

  // Structured course data with Phases → Weeks → Lessons
  const courseData = {
    id: courseSlug,
    title: getCourseTitle(courseSlug),
    instructor: 'John Instructor',
    totalPhases: 3,
    currentPhase: 1,
    currentWeek: 1,
    currentLesson: lessonNumber,
    phases: [
      {
        id: 1,
        title: 'Foundation Phase',
        description: 'Master the fundamentals and core concepts',
        duration: '4 weeks',
        weeks: [
          {
            id: 1,
            title: 'Week 1: Getting Started',
            description: 'Introduction and setup',
            lessons: [
              {
                id: 1,
                title: 'Course Introduction & Overview',
                duration: '12:30',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: true,
                hasNotes: true,
                hasExercise: false,
                hasChecklist: true
              },
              {
                id: 2,
                title: 'Development Environment Setup',
                duration: '18:45',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: true,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: true
              },
              {
                id: 3,
                title: 'Your First Project',
                duration: '25:20',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: false,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: true
              }
            ]
          },
          {
            id: 2,
            title: 'Week 2: Core Concepts',
            description: 'Understanding the fundamentals',
            lessons: [
              {
                id: 4,
                title: 'Understanding Components',
                duration: '22:15',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: false,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: true
              },
              {
                id: 5,
                title: 'Props and Data Flow',
                duration: '19:30',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: false,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Intermediate Phase',
        description: 'Build more complex applications',
        duration: '6 weeks',
        weeks: [
          {
            id: 3,
            title: 'Week 3: State Management',
            description: 'Managing application state',
            lessons: [
              {
                id: 6,
                title: 'Introduction to State',
                duration: '16:45',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: false,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: true
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Advanced Phase',
        description: 'Master advanced concepts and deployment',
        duration: '4 weeks',
        weeks: [
          {
            id: 4,
            title: 'Week 4: Advanced Patterns',
            description: 'Advanced development patterns',
            lessons: [
              {
                id: 7,
                title: 'Advanced Hooks',
                duration: '28:20',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
                completed: false,
                hasNotes: true,
                hasExercise: true,
                hasChecklist: true
              }
            ]
          }
        ]
      }
    ]
  };

  // Find current lesson from the hierarchical structure
  const findCurrentLesson = () => {
    for (const phase of courseData.phases) {
      for (const week of phase.weeks) {
        const lesson = week.lessons.find(l => l.id === courseData.currentLesson);
        if (lesson) {
          return {
            lesson,
            week,
            phase,
            weekLessons: week.lessons
          };
        }
      }
    }
    // Fallback to first lesson
    return {
      lesson: courseData.phases[0].weeks[0].lessons[0],
      week: courseData.phases[0].weeks[0],
      phase: courseData.phases[0],
      weekLessons: courseData.phases[0].weeks[0].lessons
    };
  };

  const { lesson: currentLesson, week: currentWeek, phase: currentPhase, weekLessons } = findCurrentLesson();

  // Helper function to get total lessons count
  const getTotalLessons = () => {
    return courseData.phases.reduce((total, phase) => {
      return total + phase.weeks.reduce((weekTotal, week) => {
        return weekTotal + week.lessons.length;
      }, 0);
    }, 0);
  };

  // Helper function to get current lesson index
  const getCurrentLessonIndex = () => {
    let index = 0;
    for (const phase of courseData.phases) {
      for (const week of phase.weeks) {
        for (const lesson of week.lessons) {
          if (lesson.id === courseData.currentLesson) {
            return index;
          }
          index++;
        }
      }
    }
    return 0;
  };

  const lessonContent = {
    notes: `# ${currentLesson.title}

## Phase: ${currentPhase.title}
**Week ${currentWeek.id}**: ${currentWeek.title}

## Overview
${currentWeek.description}

## Key Learning Points
- Understanding the core concepts
- Practical implementation techniques
- Best practices and common patterns
- Real-world application examples

## Detailed Notes
This lesson covers essential concepts that will form the foundation for your learning journey. 

### Important Concepts:
1. **Core Principles**: Understanding the fundamental principles
2. **Implementation**: Step-by-step implementation guide
3. **Best Practices**: Industry-standard approaches
4. **Common Pitfalls**: What to avoid and how to fix issues

### Code Examples:
\`\`\`javascript
// Example code will be provided here
const example = "This is a sample code block";
console.log(example);
\`\`\`

## Resources
- [Official Documentation](https://example.com)
- [Community Forum](https://example.com)
- [Additional Reading](https://example.com)`,

    exercises: [
      {
        id: 1,
        title: `Practice Exercise: ${currentLesson.title}`,
        description: 'Apply what you learned in this lesson with hands-on practice',
        difficulty: 'Beginner',
        estimatedTime: '30 minutes',
        instructions: `
1. Set up your development environment
2. Create a new project file
3. Implement the concepts from the lesson
4. Test your implementation
5. Compare with the provided solution
        `,
        starterCode: `// Starter code for ${currentLesson.title}
// TODO: Implement the lesson concepts here

console.log("Starting exercise...");`,
        solution: `// Solution for ${currentLesson.title}
// This is the complete implementation

const solution = "Complete implementation here";
console.log(solution);`
      }
    ],

    checklist: [
      {
        id: 1,
        task: 'Watch the video lesson completely',
        completed: currentLesson.completed,
        required: true
      },
      {
        id: 2,
        task: 'Read through the lesson notes',
        completed: false,
        required: true
      },
      {
        id: 3,
        task: 'Complete the practice exercise',
        completed: false,
        required: currentLesson.hasExercise
      },
      {
        id: 4,
        task: 'Review the code examples',
        completed: false,
        required: true
      },
      {
        id: 5,
        task: 'Ask questions in the discussion forum',
        completed: false,
        required: false
      }
    ],

    project: {
      title: `Week ${currentWeek.id} Project: Build a ${currentLesson.title} Application`,
      description: 'Apply all the concepts from this week in a comprehensive project.',
      requirements: [
        'Implement the core functionality',
        'Follow best practices',
        'Add proper error handling',
        'Include documentation',
        'Test your implementation'
      ],
      deliverables: [
        'Working application',
        'Source code with comments',
        'README documentation',
        'Demo video or screenshots'
      ],
      resources: [
        'Project template files',
        'Design mockups',
        'API documentation',
        'Testing guidelines'
      ]
    },

    quiz: [
      {
        id: 1,
        question: `What is the main concept covered in "${currentLesson.title}"?`,
        options: [
          'Basic implementation',
          'Advanced patterns',
          'Core fundamentals',
          'All of the above'
        ],
        correct: 3,
        explanation: 'This lesson covers comprehensive concepts including basics, patterns, and fundamentals.'
      },
      {
        id: 2,
        question: 'Which approach is recommended for best practices?',
        options: [
          'Quick implementation',
          'Following established patterns',
          'Custom solutions only',
          'Avoiding documentation'
        ],
        correct: 1,
        explanation: 'Following established patterns ensures maintainable and scalable code.'
      }
    ]
  };

  const tabs = [
    { id: 'video', label: 'Video', icon: PlayIcon },
    { id: 'notes', label: 'Notes', icon: DocumentTextIcon },
    { id: 'checklist', label: 'Checklist', icon: CheckCircleIcon },
    { id: 'exercises', label: 'Exercises', icon: CodeBracketIcon },
    { id: 'project', label: 'Project', icon: AcademicCapIcon },
    { id: 'quiz', label: 'Quiz', icon: BookOpenIcon },
    { id: 'discussion', label: 'Discussion', icon: ChatBubbleLeftRightIcon }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLessonComplete = () => {
    setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
    toast.success('Lesson completed!');
  };

  const navigateLesson = (direction) => {
    // Get all lessons in order
    const allLessons = [];
    courseData.phases.forEach(phase => {
      phase.weeks.forEach(week => {
        week.lessons.forEach(lesson => {
          allLessons.push(lesson);
        });
      });
    });
    
    const currentIndex = allLessons.findIndex(l => l.id === courseData.currentLesson);
    let newIndex;
    
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < allLessons.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return;
    }
    
    const newLesson = allLessons[newIndex];
    navigate(`/learn/${courseSlug}/lesson-${newLesson.id}`);
  };

  const renderVideoPlayer = () => (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={currentLesson.videoUrl}
          title={currentLesson.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      <div className="p-4 bg-gray-900 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{currentLesson.title}</h3>
          <span className="text-sm text-gray-300">{currentLesson.duration}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleLessonComplete}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            <CheckCircleIcon className="w-4 h-4" />
            <span>Mark Complete</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lesson Notes</h3>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {lessonContent.notes}
        </pre>
      </div>
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">My Notes</h4>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your personal notes here..."
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Notes
        </button>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lesson Checklist</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {lessonContent.checklist.filter(item => item.completed).length} of {lessonContent.checklist.length} completed
        </div>
      </div>
      
      <div className="space-y-4">
        {lessonContent.checklist.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  // Handle checklist item toggle
                  const updatedChecklist = [...lessonContent.checklist];
                  updatedChecklist[index].completed = !updatedChecklist[index].completed;
                  // In real app, this would update the backend
                  toast.success(item.completed ? 'Task unmarked' : 'Task completed!');
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex-1">
              <label className={`text-sm font-medium cursor-pointer ${
                item.completed 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {item.task}
                {item.required && (
                  <span className="ml-2 text-xs text-red-500 dark:text-red-400">*Required</span>
                )}
              </label>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center">
          <CheckCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm text-blue-800 dark:text-blue-200">
            Complete all required tasks to mark this lesson as finished
          </span>
        </div>
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      {lessonContent.exercises.map((exercise, index) => (
        <div key={exercise.id} className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Exercise {index + 1}: {exercise.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{exercise.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {exercise.difficulty}
                </span>
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {exercise.estimatedTime}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instructions:</h4>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded">
              {exercise.instructions}
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Starter Code:</h4>
            <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
              <code>{exercise.starterCode}</code>
            </pre>
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Exercise
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Solution
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProject = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {lessonContent.project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {lessonContent.project.description}
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
          <ul className="space-y-2">
            {lessonContent.project.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Deliverables</h4>
          <ul className="space-y-2">
            {lessonContent.project.deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start">
                <DocumentTextIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Helpful Resources</h4>
        <ul className="space-y-2">
          {lessonContent.project.resources.map((resource, index) => (
            <li key={index} className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              {resource}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex space-x-3">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Start Project
        </button>
        <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Download Template
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      {lessonContent.quiz.map((question, index) => (
        <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question {index + 1}: {question.question}
          </h3>
          <div className="space-y-3 mb-4">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Answer
          </button>
        </div>
      ))}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Complete Quiz
        </button>
      </div>
    </div>
  );

  const renderDiscussion = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Discussion Forum</h3>
      <div className="mb-6">
        <textarea
          placeholder="Ask a question or share your thoughts about this lesson..."
          className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Post Comment
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              JS
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">John Student</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Great explanation of React components! I'm finally starting to understand the difference between functional and class components.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
                Reply
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              MS
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">Mary Smith</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Can someone help me with the exercise? I'm getting an error when trying to import React.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'video':
        return renderVideoPlayer();
      case 'notes':
        return renderNotes();
      case 'checklist':
        return renderChecklist();
      case 'exercises':
        return renderExercises();
      case 'project':
        return renderProject();
      case 'quiz':
        return renderQuiz();
      case 'discussion':
        return renderDiscussion();
      default:
        return renderVideoPlayer();
    }
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Course Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {courseData.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                by {courseData.instructor}
              </p>
              <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(completedLessons.size / getTotalLessons()) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {completedLessons.size} of {getTotalLessons()} lessons completed
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <ListBulletIcon className="w-4 h-4 mr-2" />
                Course Structure
              </h3>
              
              {/* Phases */}
              <div className="space-y-4">
                {courseData.phases.map((phase) => (
                  <div key={phase.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        Phase {phase.id}: {phase.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {phase.description} • {phase.duration}
                      </p>
                    </div>
                    
                    {/* Weeks within Phase */}
                    <div className="p-2">
                      {phase.weeks.map((week) => (
                        <div key={week.id} className="mb-3 last:mb-0">
                          <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <h5 className="text-xs font-medium text-blue-800 dark:text-blue-200">
                              {week.title}
                            </h5>
                          </div>
                          
                          {/* Lessons within Week */}
                          <div className="mt-2 space-y-1">
                            {week.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                onClick={() => navigate(`/learn/${courseSlug}/lesson-${lesson.id}`)}
                                className={`p-2 rounded cursor-pointer transition-colors text-xs ${
                                  lesson.id === courseData.currentLesson
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    {lesson.completed || completedLessons.has(lesson.id) ? (
                                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                                    )}
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        {lesson.title}
                                      </p>
                                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                                        <span>{lesson.duration}</span>
                                        <div className="flex space-x-1">
                                          {lesson.hasNotes && <DocumentTextIcon className="w-3 h-3" />}
                                          {lesson.hasExercise && <CodeBracketIcon className="w-3 h-3" />}
                                          {lesson.hasChecklist && <CheckCircleIcon className="w-3 h-3" />}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <PlayIcon className="w-3 h-3 text-gray-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentLesson.title}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhase.title} • {currentWeek.title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigateLesson('prev')}
                  disabled={getCurrentLessonIndex() === 0}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => navigateLesson('next')}
                  disabled={getCurrentLessonIndex() === getTotalLessons() - 1}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;