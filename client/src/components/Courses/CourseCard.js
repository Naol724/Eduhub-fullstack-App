import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card card-interactive group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1">
      {/* Course thumbnail with overlay */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {course.thumbnail ? (
          <>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
          </>
        ) : (
          <div className="text-gray-400 text-2xl sm:text-3xl md:text-4xl animate-pulse">📚</div>
        )}
        
        {/* Level badge with enhanced hover */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
          <span className="badge badge-primary text-xs shadow-lg group-hover:shadow-xl group-hover:from-primary-600 group-hover:to-purple-600 transition-all duration-300">
            {course.level}
          </span>
        </div>

        {/* Hover overlay content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-white text-center transform scale-0 group-hover:scale-100 transition-all duration-500 delay-100">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 mb-1 sm:mb-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197 2.132a1 1 0 00.555.168V14a2 2 0 002 2h4a2 2 0 002-2V9.87a1 1 0 00-.555-.168L14.752 11.168z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium">View Course</p>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6 relative">
        {/* Enhanced title with gradient hover */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500 transform group-hover:translate-x-1">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center group">
            {course.instructor?.avatar ? (
              <img
                src={course.instructor.avatar}
                alt={course.instructor.first_name}
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full mr-1 sm:mr-2 object-cover border border-white shadow-sm group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
              />
            ) : (
              <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 mr-1 sm:mr-2 flex items-center justify-center shadow-sm group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                <span className="text-white text-xs font-medium">
                  {course.instructor?.first_name?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
              {course.instructor?.first_name} {course.instructor?.last_name}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex items-center group">
              <span className="text-yellow-400 text-sm sm:text-lg group-hover:text-yellow-300 group-hover:scale-125 transition-all duration-300">⭐</span>
              <span className="text-xs sm:text-sm font-bold text-gray-600 ml-1 group-hover:text-primary-600 transition-colors duration-300">
                {course.rating || '0.0'}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
              ({course.rating_count || 0})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {course.duration_hours && (
              <div className="flex items-center text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-300 transform group-hover:scale-110">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration_hours}h
              </div>
            )}
            {course.students_count && (
              <div className="flex items-center text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-300 transform group-hover:scale-110">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1a2 2 0 01-2 2h6a2 2 0 01-2-2v-1a6 6 0 0112 0v1a2 2 0 01-2 2z" />
                </svg>
                {course.students_count}
              </div>
            )}
          </div>
          
          <div className="text-right">
            {course.price > 0 ? (
              <div className="group">
                {course.original_price && course.original_price > course.price && (
                  <span className="text-xs text-gray-400 line-through mr-1 sm:mr-2 group-hover:text-gray-500 transition-colors duration-300">
                    ${course.original_price}
                  </span>
                )}
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 transform group-hover:scale-110">
                  ${course.price}
                </span>
              </div>
            ) : (
              <div className="group transform transition-all duration-300 group-hover:scale-110">
                <span className="text-sm sm:text-base md:text-lg font-bold text-green-600 bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm group-hover:from-green-600 group-hover:to-green-700 group-hover:text-white group-hover:bg-gradient-to-r transition-all duration-300 shadow-md group-hover:shadow-xl">
                  Free
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Link
          to={`/courses/${course.id}`}
          className="btn btn-primary mt-2 sm:mt-4 w-full group-hover:from-primary-600 group-hover:via-purple-600 group-hover:to-pink-600 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:rotate-1 text-xs sm:text-sm"
        >
          <span className="flex items-center justify-center">
            View Course
            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform transition-all duration-300 group-hover:translate-x-2 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5v12" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;