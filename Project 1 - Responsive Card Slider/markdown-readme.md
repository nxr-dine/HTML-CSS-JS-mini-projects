# Responsive Card Slider

A modern, lightweight responsive card slider built with vanilla JavaScript, HTML, and CSS. This slider automatically adapts to different screen sizes, showing the optimal number of cards for each viewport while maintaining smooth transitions.

![Responsive Card Slider](https://via.placeholder.com/800x400?text=Responsive+Card+Slider)

## Features

- **Fully Responsive**: Automatically adjusts the number of visible cards based on screen size
- **Touch Support**: Swipe gestures on mobile devices
- **Keyboard Navigation**: Use arrow keys to navigate between slides
- **Pagination**: Visual indicator of current position with clickable dots
- **Smooth Transitions**: CSS transitions for smooth sliding effects
- **No Dependencies**: Built with vanilla JavaScript, no external libraries required
- **Optional Autoplay**: Can be enabled for automatic cycling through cards
- **Customizable**: Easily modify styles to match your project's design

## Demo

View the live demo [here](#) (replace with your actual demo link when available)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/responsive-card-slider.git
```

2. Open `index.html` in your browser to see the slider in action.

## Usage

### Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Card Slider</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Responsive Card Slider</h1>
        
        <div class="slider-container">
            <!-- Slider controls -->
            <div class="slider-controls">
                <button id="prev-btn" class="control-btn">
                    <!-- Previous button icon -->
                </button>
                <button id="next-btn" class="control-btn">
                    <!-- Next button icon -->
                </button>
            </div>
            
            <!-- Slider wrapper -->
            <div class="slider-wrapper">
                <div class="slider">
                    <!-- Your cards go here -->
                </div>
            </div>
            
            <!-- Pagination dots -->
            <div class="pagination"></div>
        </div>
    </div>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### Adding Cards

To add or modify cards, edit the HTML structure inside the `.slider` div:

```html
<div class="card">
    <div class="card-image" style="background-color: #3498db;"></div>
    <div class="card-content">
        <h3>Card Title</h3>
        <p>Card description text goes here.</p>
    </div>
</div>
```

### Customization

#### Changing Colors and Styles

Edit the CSS variables in the `styles.css` file to match your project's design.

#### Enabling Autoplay

To enable autoplay functionality, uncomment the following line in `script.js`:

```javascript
// startAutoplay();
```

You can also adjust the autoplay delay (default 5000ms):

```javascript
const autoplayDelay = 5000; // 5 seconds
```

## Responsive Breakpoints

The slider adjusts the number of visible cards based on these breakpoints:

- **Mobile** (<640px): 1 card per view
- **Tablet** (≥640px): 2 cards per view
- **Medium screens** (≥768px): 3 cards per view
- **Large screens** (≥1024px): 4 cards per view

## Browser Support

The slider works on all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various card slider designs across the web
- SVG icons for navigation buttons

---

Made with ❤️ by [Your Name]
