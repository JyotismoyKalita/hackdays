'use client';
import { WavyBackground } from './ui/wavy-background';
import { AnimatedTooltip } from './ui/animated-tooltip';

const instructors = [
    {
        id: 1,
        name: 'Sanjib Das',
        designation: 'GU-IT',
        image: 'https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8n3xXUyGEX8KUPvVxal0qCjzYAN6cfLipksrt1',
    },
    {
        id: 5,
        name: 'Jyotismoy Kalita',
        designation: 'GU-IT',
        image: 'https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8npS8GVIE2f873oz4uAcFVJOCnybXaqYvrHPxZ',
    },
    {
        id: 2,
        name: 'Bhargav Das',
        designation: 'GU-IT',
        image: 'https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8nz9CI3UAgLnESFHM1y8Op0td5vwZIs6bAakN2',
    },
    {
        id: 3,
        name: 'Arnab Chakraborty',
        designation: 'GU-IT',
        image: 'https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8njGk1MSmdEzudUkDcNv1i8qr3HLYgmZtsbF5P',
    },
    {
        id: 4,
        name: 'Gourab Adhikari',
        designation: 'GU-IT',
        image: 'https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8nn6sAuZjqYefK4srzhIW8EiUMo7pvBxkugZta',
    },
];

function Instructors() {
    return (
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center ">
            <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
                    Meet Our Key{' '}
                    <span className="text-teal-600">Developers</span>
                </h2>
                <p className="text-base md:text-lg text-white text-center mb-4">
                    Shaping ideas into reality with code and creativity
                </p>
                <div className="flex flex-row items-center justify-center mb-10 w-full">
                    <AnimatedTooltip items={instructors} />
                </div>
            </WavyBackground>
        </div>
    );
}

export default Instructors;
