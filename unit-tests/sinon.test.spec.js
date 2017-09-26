describe("A jasmine spy", function() {
	
	var foo, bar, fetchedBar;

	beforeEach(function() {
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};
				
		// with spyOn(foo, 'setBar').and.callThrough(), 'getBar' will actually be called	
		spyOn(foo, 'getBar').and.callThrough();
				
		foo.setBar(123);
		fetchedBar = foo.getBar();
	});

	it("tracks that the spy was called", function() {
		expect(foo.getBar).toHaveBeenCalled();
	});

	it("should not affect other functions", function() {
		expect(bar).toEqual(123);
	});

	it("when called returns the requested value", function() {
		expect(fetchedBar).toEqual(123);
	});
});

//
describe("A sinon spy on anonymous func", function() {
	//
	var func;
	
	beforeEach(function() {
		func = sinon.spy();
		func(123);
	});		
	//
	it("test spy func being called", function() {
		sinon.assert.calledOnce(func);
		sinon.assert.calledWith(func, 123);
	});
});

//
describe("A sinon spy on existing func/obj.func", function() {
	
	var foo, bar, fetchedBar;
	//var fooFunc;
	
	
	beforeEach(function() {
		
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};
		
		//fooFunc = function() {
		//	return bar;
		//};
				
		// spy on func
		//sinon.spy(fooFunc);
		//fooFunc();
		
		// spy on func of an obj
		sinon.spy(foo, 'getBar');

		foo.setBar(123);
		fetchedBar = foo.getBar();
	});
	//
	afterEach(function() {		
		foo.getBar.restore();	
		//fooFunc.restore();
	});
	//
	it("jasmine assertion", function() {
		//
		expect(foo.getBar.calledOnce).toBe(true);
		expect(foo.getBar.getCall(0).args[0]).toBeUndefined();
	});
	//
	it("sinon assertion", function() {
		//		
		//sinon.assert.calledOnce(fooFunc);
		//sinon.assert.calledWith(fooFunc);	// expected to be called with undefined
		sinon.assert.calledOnce(foo.getBar);
	    sinon.assert.calledWith(foo.getBar);	// expected to be called with undefined
	});
});

describe("A sinon stub on existing obj.func", function() {
	
	var foo, bar, fetchedBar;
	var objFuncSpy, objFuncStub;
	
	beforeEach(function() {
		
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			},
			getBarStub: function() {
				return bar;
			}
		};		
		//
		objFuncSpy = sinon.spy(foo, 'getBar');
		foo.setBar(123);
		fetchedBar = foo.getBar();
		//
		objFuncStub = sinon.stub(foo, 'getBarStub');
		objFuncStub.onCall(0).returns(321);
		fetchedBar = foo.getBarStub();
		//				
	});
	//
	afterEach(function() {		
		foo.getBar.restore();	
		foo.getBarStub.restore();
	});
	//	
	it("return value", function() {
		//						
		expect(objFuncSpy.getCall(0).returnValue).toEqual(123);	
		//
		//expect(fetchedBar).toEqual(321);
		expect(objFuncStub.getCall(0).returnValue).toEqual(321);
	});
});

describe("A sinon mock/expectation", function() {
	
	var foo, bar, fetchedBar;
	var mock, expectation;
	
	beforeEach(function() {
		//
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};		
		//
		mock = sinon.mock(foo);
		mock.expects("getBar").once();
		//
		foo.setBar(123);
	    fetchedBar = foo.getBar();
	    //
	});
	//
	afterEach(function() {		
		mock.restore();
	});
	//	
	it("throws exception if expectation not met", function() {		
		//		
		mock.verify();		
		//		
	});
});

describe("A sinon faker timer", function() {
	
	var foo, bar, fetchedBar;
	var fakeTimer;
	
	beforeEach(function() {
		//
		foo = {
			setBar: function(value) {
				bar = value;
			},
			setBarAsync: function(value) {
				setTimeout(function(){
					bar = value;
				},1000);
			},
			getBar: function() {
				return bar;
			}
		};		
		//
		fakeTimer = sinon.useFakeTimers();
	});
	//
	afterEach(function() {		
		fakeTimer.restore();
	});
	//	
	it("tick timer", function() {		
		//		
		foo.setBar(123);
		expect(foo.getBar()).toEqual(123);
		//
		foo.setBarAsync(321);	
		expect(foo.getBar()).toEqual(123);
		//
		fakeTimer.tick(1500);
		expect(foo.getBar()).toEqual(321);
		//
	});
});

describe("A sinon faker XHR", function() {
	
	var foo, bar, fetchedBar;
	var fakeXhr, requests, callback;
	
	beforeEach(function() {
		//
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};		
		//
		fakeXhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        //
        fakeXhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
	});
	//
	afterEach(function() {		
		fakeXhr.restore();
	});
	//	
	it("", function() {		
		//		
		callback = sinon.spy();        
		jQuery.ajax("/restservice", {
			success: callback
		});
		//
        expect(requests.length).toEqual(1);
        //
        //requests[0].setResponseHeaders({"Content-Type": "application/json"});
        //
        //requests[0].setResponseBody('[{"id":12,"bar":123}]');
        //
        // fake server response
        requests[0].respond(
        	200,										// status 
        	{ "Content-Type": "application/json" },		// header
        	'[{"id":12,"bar":123}]'						// body
        );
        //        
        expect(callback.calledOnce).toBe(true);        
        expect(callback.calledWith([{id:12,bar:123}])).toBe(true);
		//
	});
});

describe("A sinon faker server", function() {
	
	var foo, bar, fetchedBar;
	var fakeServer, fakeXhr, requests, callback;
	
	beforeEach(function() {
		//
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};		
		//
		fakeServer = sinon.fakeServer.create();
		//
		//fakeServer.autoRespond = true;
		//fakeServer.autoRespondAfter = 10; // default is 10ms	
		//fakeServer.respondImmediately = true;
		//
		fakeServer.respondWith(
			"GET", 
			"/restservice",
	        [200, {"Content-Type":"application/json"}, '[{"id":12,"bar":123}]']	
	    );
	});
	//
	afterEach(function() {		
		fakeServer.restore();
	});
	//	
	it("", function() {		
		//		
		callback = sinon.spy();        
		jQuery.ajax("/restservice", {
			success: callback
		});
		//
		fakeServer.respond();
		//        
		expect(callback.calledOnce).toBe(true);        
        expect(callback.calledWith([{id:12,bar:123}])).toBe(true);        
	});
});

describe("Sinon Assertions", function() {
	
	var foo, bar, fetchedBar;	
	var sinonSpy1, sinonSpy2;
	
	beforeEach(function() {
		//
		foo = {
			setBar: function(value) {
				bar = value;
			},
			getBar: function() {
				return bar;
			}
		};		
		//
		sinonSpy1 = sinon.spy();
		sinonSpy2 = sinon.spy();
	});
	//
	afterEach(function() {		
		
	});
	//	
	it("", function() {		
		//sinon.assert.fail("always fails");        
		sinon.assert.pass("always passes");
		//
		sinonSpy1();
		//
		sinon.assert.called(sinonSpy1);
		sinon.assert.notCalled(sinonSpy2);
		//
		sinonSpy1.reset();
		sinon.assert.notCalled(sinonSpy1);
		//
	});
});

describe("Sinon Assertions", function() {
	
	var foo;	
	var sinonSpy, sinonStub;
	var stringOrObj, fooWithName, customerMatch;
	
	beforeEach(function() {
		//
		foo = {
			id: 1,
			name: "one"
		};
		//
		sinonSpy = sinon.spy();
		//
		sinonStub = sinon.stub();
		sinonStub.withArgs(sinon.match.string).returns(true);
		sinonStub.withArgs(sinon.match.number).throws("TypeError");
		//
		stringOrObj = sinon.match.string.or(sinon.match.object);
		sinonStub.withArgs(stringOrObj).returns(1);
		
		//fooWithName = sinon.match.instanceOf(Type).and(sinon.match.has("name"));
		// 
		//customerMatch = sinon.match(function (value) {
	    //	return !!value;
		//}, "trueIsh");		
		//
	});
	//
	afterEach(function() {		
		
	});
	//	
	it("", function() {		
		//        
		sinonSpy({id:1});
		//
		sinon.assert.calledWith(sinonSpy, sinon.match({id:1}));
		//
		sinonSpy({name:"one"});
		expect(sinonSpy.calledWith(sinon.match({name:"one"}))).toBe(true);
		//
		//sinonSpy({name:"one"});
		//expect(sinonSpy.calledWith(fooWithName)).toBe(true);
		//
		expect(sinonStub("abc")).toBe(true);
		try {
			sinonStub(123);
		} catch(e) {
			
		}		
		sinon.assert.threw(sinonStub, "TypeError");
		//		
		expect(sinonStub({})).toEqual(1);
		//
		
	});
	
	describe("Sinon Sandbox", function() {
		
		var foo, bar, fetchedBar;	
		var sinonSandbox, sinonSpy1, sinonSpy2;
		
		beforeEach(function() {
			//
			foo = {
				setBar: function(value) {
					bar = value;
				},
				getBar: function() {
					return bar;
				}
			};		
			//
			sinonSandbox = sinon.sandbox.create({
				// default config
				injectInto: null,
			    properties: ["spy", "stub", "mock", "clock", "server", "requests"],
			    useFakeTimers: true,
			    useFakeServer: true	
			});
			sinonSpy1 = sinonSandbox.spy();
			sinonSpy2 = sinonSandbox.spy();
		});
		//
		afterEach(function() {		
			sinonSandbox.restore();
		});
		//	
		it("", function() {		
			//sinon.assert.fail("always fails");        
			sinon.assert.pass("always passes");
			//
			sinonSpy1();
			//
			sinon.assert.called(sinonSpy1);
			sinon.assert.notCalled(sinonSpy2);
			//
			sinonSpy1.reset();
			sinon.assert.notCalled(sinonSpy1);
			//
		});
	});
	
	describe("A sinon faker timer with sandbox", function() {
		
		var foo, bar, fetchedBar;
		var sinonSandbox, fakeTimer;
		
		beforeEach(function() {
			//
			foo = {
				setBar: function(value) {
					bar = value;
				},
				setBarAsync: function(value) {
					setTimeout(function(){
						bar = value;
					},1000);
				},
				getBar: function() {
					return bar;
				}
			};		
			//
			sinonSandbox = sinon.sandbox.create();
			fakeTimer = sinonSandbox.useFakeTimers();
		});
		//
		afterEach(function() {		
			sinonSandbox.restore();
		});
		//	
		it("tick timer", function() {		
			//		
			foo.setBar(123);
			expect(foo.getBar()).toEqual(123);
			//
			foo.setBarAsync(321);	
			expect(foo.getBar()).toEqual(123);
			//
			fakeTimer.tick(1500);
			expect(foo.getBar()).toEqual(321);
			//
		});
	});
	
describe("A sinon faker timer with test", function() {
		
		var foo, bar, fetchedBar;
		var sinonSpy, fakeTimer;
		
		beforeEach(function() {
			//
			foo = {
				setBar: function(value) {
					bar = value;
				},
				setBarAsync: function(value) {
					setTimeout(function(){
						bar = value;
					},1000);
				},
				getBar: function() {
					return bar;
				}
			};		
			//						
		});
		//
		afterEach(function() {		
			//
		});
		//	
		it("tick timer in sinon test", sinon.test(function() {		
			//		
			fakeTimer = sinon.useFakeTimers();			
			//
			foo.setBar(123);
			expect(foo.getBar()).toEqual(123);
			//
			foo.setBarAsync(321);	
			expect(foo.getBar()).toEqual(123);
			//
			fakeTimer.tick(1500);
			expect(foo.getBar()).toEqual(321);			
		}));
		//
		it("spy in sinon test", sinon.test(function() {					
			sinonSpy = this.spy();
			sinonSpy();
			sinon.assert.called(sinonSpy);					
		}));
		
		it("outside sinon test", sinon.test(function() {								
			// Should sinonSpy be restored already at this point?
			sinonSpy();
			sinon.assert.calledOnce(sinonSpy);					
		}));
	});
	
});