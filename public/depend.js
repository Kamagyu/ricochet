class Vector
{
	/**
	 * @param {number} x
	 * @param {number} y
	 */

	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @description Set the x/y component of the vector
	 */
	set(x, y)
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * @param {Vector} v
	 * @description Add the components of another vector to this
	 * */
	add(v)
	{
		this.x += v.x;
		this.y += v.y;
	}

	/**
	 * @param {number} num
	 * @description Multiply every component of the vector by num
	 * */
	mult(num)
	{
		this.x *= num;
		this.y *= num;
	}

	/**
	 * @param {number} num
	 * @description Divide every component of the vector by num
	 * */
	div(num)
	{
		this.x /= num;
		this.y /= num;
	}

	/**
	 * Returns the length squared of the vector
	 */
	magSq()
	{
		return this.x * this.x + this.y * this.y;
	}
	
	/**
	 * @description Returns the length of the vector
	 */
	mag()
	{
		return Math.sqrt(this.magSq());
	}
	
	/**
	 * @description Normalize the component of the vector to be between 0 and 1
	 */
	normalize()
	{
		this.div(this.mag());
	}
	
	/**
	 * @description Returns a copy of the vector
	 */
	copy()
	{
		return new Vector(this.x, this.y);
	}
}

class Reflector
{
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(x, y)
	{
		this.pos = new Vector(x, y);
	}
}

class User
{
	/**
	 * 
	 * @param {string} name 
	 */
	constructor(name)
	{
		this.name = name;
	}
}

/**
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @param {number} val3 
 * @param {number} amt
 */

function lerp3(val1, val2, val3, amt)
{
	if(amt < 0.33)
		return lerp(val1, val2, amt * 3);

	if(amt < 0.66)
		return lerp(val2, val3, (amt - 0.33) * 3);

	return lerp(val3, val1, (amt - 0.66) * 3);
}

