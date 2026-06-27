const NavBar = () => {
    const navItems = [
        { label: "Store" },
        { label: "Mac" }, 
        {label: "Iphone"}, 
        {label: "Watch"}, 
        {label: "Vision"}, 
        {label: "Airpods"}
    ];

    return (
        <header>
          <nav>
            <img src="/logo.svg" alt="Apple logo" />
            <ul>
                {navItems.map(({label}) => (
                    <li key={label}> 
                        <a href={label.toLowerCase()}>{label}</a> 
                    </li> 
                ))}
            </ul>
            <div className="flex items-center gap-3">
                <button>
                    <img src="/search.svg" alt="search" />
                </button>
                <button>
                    <img src="/cart.svg" alt="cart" />
                </button>
            </div>
          </nav>
        </header>
    )
}

export default NavBar 