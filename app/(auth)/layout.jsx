export default function AuthLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] py-12 px-6">
            {children}
        </div>
    );
}
