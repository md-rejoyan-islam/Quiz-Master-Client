import ProfileForm from "@/components/main/profile/profile-form";

export const metadata = {
  title: "Profile",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default function Profile() {
  return (
    <div className="bg-gradient-to-b py-12 md:py-16  from-transparent via-transparent to-slate-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
}
