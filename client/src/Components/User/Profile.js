

export default function Profile(){
    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md max-w-4xl">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-20 h-20 rounded-full border-2 border-gray-200"
              src="https://via.placeholder.com/150"
              alt="User Profile"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-700">John Doe</h1>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
  
        {/* Profile Info */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Full Name</p>
                <p className="text-gray-700">John Doe</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Email</p>
                <p className="text-gray-700">johndoe@example.com</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Phone</p>
                <p className="text-gray-700">+123 456 7890</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Location</p>
                <p className="text-gray-700">New York, USA</p>
              </div>
            </div>
          </div>
  
          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Social Links</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">LinkedIn</p>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  linkedin.com/in/johndoe
                </a>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">GitHub</p>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  github.com/johndoe
                </a>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Twitter</p>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  twitter.com/johndoe
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* About Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">About</h2>
          <p className="mt-2 text-gray-600">
            John is a software engineer with over 5 years of experience in developing scalable web applications. He is passionate about open-source, loves solving complex problems, and enjoys collaborating with cross-functional teams.
          </p>
        </div>
      </div>
    )
}