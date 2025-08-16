export function ContactMap() {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
      {/* Placeholder for map - in real implementation, you'd use Google Maps or similar */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-200">
        <div className="text-center">
          <div className="text-cyan-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">Our Location</h4>
          <p className="text-gray-600 text-sm">Connaught Place, New Delhi</p>
          <p className="text-cyan-600 text-sm mt-2 cursor-pointer hover:underline">View on Google Maps</p>
        </div>
      </div>
    </div>
  )
}
