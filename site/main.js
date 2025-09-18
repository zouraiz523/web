  $(document).ready(function() {
            // Hide loader after page load
            setTimeout(function() {
                $('.loader').addClass('hidden');
            }, 1500);
            
            // Header scroll effect
            $(window).scroll(function() {
                if ($(this).scrollTop() > 50) {
                    $('header').addClass('scrolled');
                } else {
                    $('header').removeClass('scrolled');
                }
                
                // Scroll to top button visibility
                if ($(this).scrollTop() > 300) {
                    $('.scroll-top').addClass('visible');
                } else {
                    $('.scroll-top').removeClass('visible');
                }
                
                // Animate elements on scroll
                animateOnScroll();
            });
            
            // Mobile Menu Toggle
            $('.mobile-menu-btn').click(function() {
                $('.mobile-menu').addClass('active');
                $('body').css('overflow', 'hidden');
            });
            
            $('.close-menu').click(function() {
                $('.mobile-menu').removeClass('active');
                $('body').css('overflow', 'auto');
            });
            
            // Close mobile menu when clicking on links
            $('.mobile-menu a').click(function() {
                $('.mobile-menu').removeClass('active');
                $('body').css('overflow', 'auto');
            });
            
            // Smooth Scrolling
            $('a[href*="#"]').on('click', function(e) {
                if (this.hash !== "" && $(this.hash).length) {
                    e.preventDefault();
                    
                    const hash = this.hash;
                    
                    $('html, body').animate(
                        {
                            scrollTop: $(hash).offset().top - 80,
                        },
                        800,
                        'swing',
                        function() {
                            window.location.hash = hash;
                        }
                    );
                }
            });
            
            // Testimonial Slider
            let currentTestimonial = 0;
            const testimonials = $('.testimonial');
            const dots = $('.testimonial-dot');
            const testimonialCount = testimonials.length;
            
            function showTestimonial(index) {
                testimonials.removeClass('active prev next');
                
                // Set classes for animation
                testimonials.eq(index).addClass('active');
                
                if (index > 0) {
                    testimonials.eq(index - 1).addClass('prev');
                }
                
                if (index < testimonialCount - 1) {
                    testimonials.eq(index + 1).addClass('next');
                }
                
                dots.removeClass('active');
                dots.eq(index).addClass('active');
                
                currentTestimonial = index;
            }
            
            dots.each(function(index) {
                $(this).click(function() {
                    showTestimonial(index);
                });
            });
            
            // Auto rotate testimonials
            setInterval(function() {
                currentTestimonial = (currentTestimonial + 1) % testimonialCount;
                showTestimonial(currentTestimonial);
            }, 6000);
            
            // Animate elements on scroll
            function animateOnScroll() {
                const windowHeight = $(window).height();
                const scrollPos = $(window).scrollTop();
                
                // Animate section titles
                $('.section-title').each(function() {
                    const $element = $(this);
                    const elementTop = $element.offset().top;
                    
                    if (elementTop < scrollPos + windowHeight - 100 && !$element.hasClass('animate')) {
                        $element.addClass('animate');
                    }
                });
                
                // Animate product cards and benefit cards
                $('.product-card, .benefit-card').each(function() {
                    const $element = $(this);
                    const elementTop = $element.offset().top;
                    
                    if (elementTop < scrollPos + windowHeight - 100 && !$element.hasClass('animate')) {
                        // Add delay based on element index for staggered animation
                        const index = $(this).index();
                        $(this).css('transition-delay', (index * 0.2) + 's');
                        $element.addClass('animate');
                    }
                });
            }
            
            // Initial call
            animateOnScroll();
            
            // Scroll to top functionality
            $('.scroll-top').click(function() {
                $('html, body').animate({ scrollTop: 0 }, 800);
            });
            
            // Newsletter form submission
            $('#newsletterForm').submit(function(e) {
                e.preventDefault();
                const email = $('.newsletter-input').val();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const formMessage = $('#formMessage');
                
                if (!emailRegex.test(email)) {
                    formMessage.removeClass('success').addClass('error').text('Please enter a valid email address.');
                    return;
                }
                
                // Simulate form submission
                formMessage.removeClass('error success').text('Submitting...');
                
                setTimeout(function() {
                    formMessage.removeClass('error').addClass('success').text(`Thank you for subscribing with ${email}! You'll receive our wellness tips soon.`);
                    $('.newsletter-input').val('');
                    
                    // Clear message after 5 seconds
                    setTimeout(function() {
                        formMessage.removeClass('success error').text('');
                    }, 5000);
                }, 1500);
            });
            
            // Product card hover effect enhancement
            $('.product-card').hover(
                function() {
                    // Mouse enter
                    $(this).find('.btn').css('transform', 'translateY(-3px)');
                },
                function() {
                    // Mouse leave
                    $(this).find('.btn').css('transform', 'translateY(0)');
                }
            );
        });