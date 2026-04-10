// app/page.tsx
import Image from "next/image";
import Link from "next/link";

const CountdownBox = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl py-3 w-full">
        <span className="text-lg font-semibold text-gray-800">{value}</span>
        <span className="text-xs text-gray-500">{label}</span>
    </div>
);

const Card = ({ id }: { id: string }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4">
        <div className="relative w-full h-[200px] md:h-[280px] rounded-xl overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Luxury Home"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
                <span className="text-xs opacity-80">Los Angeles, CA</span>
                <h2 className="text-lg md:text-xl font-semibold">
                    Downtown Luxury Penthouse
                </h2>
                <p className="text-sm">$3,200,000</p>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
            <CountdownBox value="6" label="Days" />
            <CountdownBox value="23" label="Hours" />
            <CountdownBox value="59" label="Minutes" />
            <CountdownBox value="49" label="Seconds" />
        </div>

        <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
                <span>18,750 sold</span>
                <span>6,250 remaining</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%]" />
            </div>
        </div>

        <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
            <div>
                <p className="text-xs text-gray-500">Ticket Price</p>
                <p className="font-semibold text-blue-600">$150</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500">Total Tickets</p>
                <p className="font-semibold text-gray-800">25,000</p>
            </div>
        </div>

        <Link
            href={`/raffle/${id}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-sm font-medium transition text-center"
        >
            View Details
        </Link>
    </div>
);

export default function RafflesItem() {
    return (
        <section className="bg-[#F9FAFB] mt-10">
            <main className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12">
                <div className="max-w-2xl w-full text-center space-y-3 mb-6">
                    <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        Active Raffle · Win Your Dream Home
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                        Win a Luxury Home
                    </h1>
                    <p className="text-sm md:text-base text-gray-500">
                        Enter our exclusive property raffle for a chance to win a stunning
                        home worth $3,350,000. Limited tickets available!
                    </p>
                </div>
                <div className="w-full max-w-2xl space-y-6">
                    <Card id="1" />
                    <Card id="2" />
                </div>
            </main>
        </section>
    );
}