const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 dark:text-gray-400 text-xl">👤</span>
          )}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            ⭐
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialCard;