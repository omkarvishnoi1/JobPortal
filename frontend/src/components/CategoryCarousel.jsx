import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Product Manager",
    "Software Tester",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "Blockchain Developer",
    "Game Developer",
    "Technical Writer",
    "Business Analyst",
    "AI Engineer",
    "System Administrator",
    "AR/VR Developer",
    "Web Designer",
    "Network Engineer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
    <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent className="gap-4"> {/* Added fixed gap between items */}
            {
                category.map((cat, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"> {/* Removed extra padding */}
                        <Button 
                            onClick={() => searchJobHandler(cat)} 
                            variant="outline" 
                            className="rounded-full text-sm px-4 py-2"
                        >
                            {cat}
                        </Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>
    )
}

export default CategoryCarousel