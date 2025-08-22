# ORVANO - Traditional Men's Wear Brand

A luxury-inspired website for ORVANO, featuring classic kurtas, pants, heritage wear, and elegant men's outfits.

## Project Overview

**Brand Name:** ORVANO  
**Industry:** Traditional Men's Wear  
**Positioning:** "Old Money Elegance. Luxury in Every Stitch."  
**Target Audience:** Men seeking timeless, classic ethnic and fusion wear with a refined aesthetic.

## Features

### Homepage
- Hero section with brand messaging
- Featured collections showcase
- About section highlighting heritage
- Contact information

### Catalog Page
- **Complete Product Catalog** with 20 ORVANO products
- **Responsive Grid Layout**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Advanced Filtering System**: Category, price range, and availability filters
- **Search Functionality**: Real-time product search
- **Pagination**: Clean, intuitive page navigation
- **Product Cards**: Professional e-commerce design with:
  - High-quality product images
  - Discount badges (SAVE ₹X)
  - Star ratings and review counts
  - Old price (strikethrough) and new price
  - Sold-out overlays for unavailable items
  - Hover effects and animations

### About Page
- Brand story and heritage
- Company values and mission
- Team information

### Services Page
- Custom tailoring services
- Alteration services
- Styling consultations

### Contact Page
- Contact form
- Location information
- Business hours

## Technical Implementation

### Frontend Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No framework dependencies, clean and performant

### Architecture
- **MVC Pattern**: Clean separation of concerns
- **Modular Code**: Reusable components and functions
- **Responsive Design**: Mobile-first approach with breakpoints

### File Structure
```
/
├── index.html              # Homepage
├── catalog.html            # Product catalog
├── about.html              # About page
├── services.html           # Services page
├── contact.html            # Contact page
├── models/
│   └── products.json       # Product data (20 ORVANO products)
├── controllers/
│   ├── appController.js    # Main application controller
│   └── catalogController.js # Catalog functionality
├── assets/
│   ├── css/
│   │   ├── style.css       # Global styles
│   │   └── catalog.css     # Catalog-specific styles
│   ├── js/
│   │   ├── navbar.js       # Navigation functionality
│   │   └── main.js         # Main JavaScript
│   └── images/             # Product and brand images
└── README.md               # This file
```

## Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (4-column grid)
- **Tablet**: 900px - 1199px (3-column grid)
- **Mobile**: 600px - 899px (2-column grid)
- **Small Mobile**: <600px (1-column grid)

### Features
- Touch-friendly interface
- Optimized for all screen sizes
- Accessible navigation
- Performance optimized

## Design System

### Typography
- **Serif Fonts**: Playfair Display for headings (luxury feel)
- **Sans Fonts**: Inter for body text (readability)

### Color Palette
- **Primary**: #7a5c3b (Warm brown)
- **Background**: #ffffff (Pure white)
- **Text**: #1b1b1b (Deep black)
- **Accents**: #6b6b6b (Muted gray)
- **Borders**: #e6e6e6 (Light gray)

### Visual Elements
- Subtle shadows and hover effects
- Smooth transitions and animations
- Professional spacing and layout
- Luxury-inspired visual hierarchy

## Product Catalog

### Categories
1. **Traditional Kurtas** - Classic ethnic wear
2. **Traditional Pants** - Heritage pants and dhotis
3. **Complete Combos** - Coordinated outfits
4. **Cuban Collar Shirts** - Modern fusion wear

### Product Features
- **20 Complete Products** with real ORVANO naming
- **Pricing**: Original and discounted prices
- **Discounts**: Clear savings display (SAVE ₹X)
- **Ratings**: 5-star rating system with review counts
- **Status**: Available or Sold Out indicators
- **Images**: High-quality product photography

### Sample Products
- ORVANO Classic Beige Kurta Pant (₹999, was ₹1,999)
- ORVANO Gurkha Heritage Pants (₹1,499, was ₹3,290)
- ORVANO Classic Combo collections (₹1,999, was ₹2,999)
- ORVANO Cuban Collar Shirt (₹1,999, was ₹2,999)

## Backend Integration Ready

### API Endpoints (Future Implementation)
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/categories` - Fetch product categories
- `POST /api/cart` - Add to cart
- `GET /api/cart` - View cart

### Data Structure
- JSON-based product data
- Category-based organization
- Price and discount calculations
- Inventory status tracking

## Getting Started

### Prerequisites
- Modern web browser
- Local development server (for JSON loading)

### Installation
1. Clone the repository
2. Open in your preferred code editor
3. Serve files using a local server (e.g., Live Server in VS Code)
4. Open `index.html` in your browser

### Development
- All files are ready for immediate use
- No build process required
- Easy to customize and extend
- Backend-ready for Node.js/Express integration

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

### Planned Features
- Shopping cart functionality
- User authentication
- Wishlist management
- Product reviews and ratings
- Advanced filtering options
- Mobile app development

### Backend Integration
- Node.js/Express server
- MongoDB database
- Payment gateway integration
- Order management system
- Inventory tracking

## Contributing

This project is designed for easy collaboration:
- Clean, documented code
- Modular architecture
- Consistent coding standards
- Responsive design principles

## License

This project is proprietary to ORVANO brand.

## Support

For technical support or questions about the implementation, please refer to the development team.

---

**Built with dedication for ORVANO - Luxury in Every Stitch**
