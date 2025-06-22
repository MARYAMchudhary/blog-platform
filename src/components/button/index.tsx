export default function Button({
    text,
    onClick,
  }: {
    text: string;
    onClick?: () => void;
  }) {
    return (
      <button
        className="rounded-md bg-yellow-600 py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp cursor-pointer"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }