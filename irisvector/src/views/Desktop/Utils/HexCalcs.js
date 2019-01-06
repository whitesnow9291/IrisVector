import HT from "./HexagonTools";
export function findHexWithSideLengthZAndRatio(sideLength, whRatio = HT.Hexagon.Static.whRatio)
{
	var z = sideLength;
	var r = whRatio;
	
	//solve quadratic
	var r2 = Math.pow(r, 2);
	var a = (1 + r2)/r2;
	var b = z/r2;
	var c = ((1-4.0*r2)/(4.0*r2)) * (Math.pow(z, 2));
	
	var x = (-b + Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
	var y = ((2.0 * x) + z)/(2.0 * r);

	var width = ((2.0*x)+z);
	var height = (2.0*y);
	
	HT.Hexagon.Static.WIDTH = width;
	HT.Hexagon.Static.HEIGHT = height;
	HT.Hexagon.Static.SIDE = z;
}

export function findHexWithWidthAndHeight(hexWidth, hexHeight)
{
	var width = hexWidth;
	var height = hexHeight;
	
	
	var y = height/2.0;
	
	//solve quadratic
	var a = -3.0;
	var b = (-2.0 * width);
	var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
	
	var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
	var x = (width - z)/2.0;
	
	HT.Hexagon.Static.WIDTH = width;
	HT.Hexagon.Static.HEIGHT = height;
	HT.Hexagon.Static.SIDE = z;
}

export function drawHexGrid(screenW = 800, screenH = 600)
{
	var grid = new HT.Grid(screenW, screenH);
	return grid;
	// var canvas = document.getElementById("hexCanvas");
	// var ctx = canvas.getContext('2d');
	// ctx.clearRect(0, 0, 800, 600);
	// for(var h in grid.Hexes)
	// {
	// 	grid.Hexes[h].draw(ctx);
	// }
}

export function getHexGridZR(sideLength, whRatio, screenW, screenH)
{
	findHexWithSideLengthZAndRatio(sideLength, whRatio);
	return drawHexGrid(screenW, screenH);
}

export function getHexGridWH(hexWidth, hexHeight)
{
	findHexWithWidthAndHeight(hexWidth, hexHeight);
	return drawHexGrid();
}

export function changeOrientation(hexOrientationNormal)
{
	if(hexOrientationNormal)
	{
		HT.Hexagon.Static.ORIENTATION = HT.Hexagon.Orientation.Normal;
	}
	else
	{
		HT.Hexagon.Static.ORIENTATION = HT.Hexagon.Orientation.Rotated;
	}
	drawHexGrid();
}

export function debugHexZR(sideLength, whRatio)
{
	findHexWithSideLengthZAndRatio(sideLength, whRatio);
	addHexToCanvasAndDraw(20, 20);
}

export function debugHexWH(hexWidth, hexHeight)
{
	findHexWithWidthAndHeight(hexWidth, hexHeight);
	addHexToCanvasAndDraw(20, 20);
}

export function addHexToCanvasAndDraw(x, y)
{
	HT.Hexagon.Static.DRAWSTATS = true;
	var hex = new HT.Hexagon(null, x, y);
	
	var canvas = document.getElementById("hexCanvas");
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 800, 600);
	hex.draw(ctx);
}