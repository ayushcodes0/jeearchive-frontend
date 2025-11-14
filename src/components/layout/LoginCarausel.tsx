"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const onboardingSlides = [
  {
    id: 1,
    title: "Start your next project in seconds",
    description: "Use AI-powered templates to kickstart your JEE preparation",
    icon: "🚀",
    colorVar: "var(--login-box-1-color)" // #F94F39 - Red/Orange
  },
  {
    id: 2,
    title: "Track your progress",
    description: "Monitor your performance across all subjects",
    icon: "📊",
    colorVar: "var(--login-box-2-color)" // #1E7CD3 - Blue
  },
  {
    id: 3,
    title: "Practice with real exams",
    description: "Access thousands of previous year questions",
    icon: "📝",
    colorVar: "var(--login-box-3-color)" // #6B66DA - Purple
  }
]

export function OnboardingCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {onboardingSlides.map((slide) => (
          <CarouselItem key={slide.id} className="basis-[70%] h-full">
            <div className="p-4 h-screen">
              <Card 
                className="border-0 h-full"
                style={{ 
                  background: slide.colorVar 
                }}
              >
                <CardContent className="h-full flex flex-col items-start justify-center p-8 min-h-[500px] text-white">
                  <div className="text-6xl mb-4">Card : {slide.id}</div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
