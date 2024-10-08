import LoginForm from "@/components/login-form/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-lg p-8 border border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Anmelden</h1>
        <LoginForm />
      </div>
    </div>
  );
}
