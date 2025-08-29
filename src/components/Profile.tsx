import profileImage from '../assets/profile-photo.jpeg';

const Profile = () => {
  return (
    <div className="space-y-8">
      {/* Profile Picture - Centered */}
      <div className="flex justify-center">
        <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700">
          <img
            src={profileImage}
            alt="유민기 면접사진"
            className="w-full h-full object-cover"
            style={{ width: '210px', height: '210px' }}
          />
        </div>
      </div>

      {/* Contact Information - Grid Layout */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800">
          <span className="text-xl">📧</span>
          <span className="text-lg">dbalsrl7648@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800">
          <span className="text-xl">📱</span>
          <span className="text-lg">010-5351-7648</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800">
          <span className="text-xl">🔗</span>
          <span className="text-lg">티스토리</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800">
          <span className="text-xl">🐙</span>
          <span className="text-lg">깃허브</span>
        </div>
      </div>

      {/* Quick Info - Card Layout */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white text-center mb-4 border-b border-gray-700 pb-2">
          빠른 정보
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-gray-300">
            <span className="block text-gray-400 text-xs">나이</span>
            <span className="text-white font-medium">25세</span>
          </div>
          <div className="text-gray-300">
            <span className="block text-gray-400 text-xs">경력</span>
            <span className="text-white font-medium">1년+</span>
          </div>
          <div className="text-gray-300 col-span-2">
            <span className="block text-gray-400 text-xs">희망직무</span>
            <span className="text-white font-medium">프론트엔드 개발자</span>
          </div>
          <div className="text-gray-300 col-span-2">
            <span className="block text-gray-400 text-xs">근무형태</span>
            <span className="text-white font-medium">정규직/프리랜서</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
