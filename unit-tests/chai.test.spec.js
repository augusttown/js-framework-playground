describe("Test chai", function() {
	
	var assert = chai.assert;
	var should = chai.should();
	var expect = chai.expect;
	
	var foo, bar, fetchedBar;
	
	beforeEach(function() {});
	afterEach(function() {});

	it(".not", function() {		
		expect(foo).to.not.equal('bar');		
	});
	
	it(".deep", function() {		
		var barObj = {bar:'baz'};
		expect(barObj).to.deep.equal({ bar: 'baz' });
		//
		var fooObj = {foo:{bar:{baz:'quux'}}}; 
		expect(fooObj).to.have.deep.property('foo.bar.baz', 'quux');
		//
		var deepCss = { '.link': { '[target]': 42 }};
		expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
		//		
	});
	
	
});
