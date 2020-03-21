'use strict';

import { expect } from 'chai';
import Flatten from '../../index';
import {relate, disjoint, equal, intersect, touch} from '../../src/algorithms/relation';

let {Point, Vector, Circle, Line, Segment, Arc, Box, Polygon, Edge, Face, Ray} = Flatten;

let {point, vector, circle, line, segment, arc, ray} = Flatten;


describe('#Algorithms.Relation', function() {
    it('Function relate defined', () => {
        expect(relate).to.exist;
        expect(relate).to.be.a('function');
    });
    it('Functions disjoint,equals,intersects,touches exist', () => {
        expect(disjoint).to.be.a('function');
        expect(equal).to.be.a('function');
        expect(intersect).to.be.a('function');
        expect(touch).to.be.a('function');
    });
    describe('#Algorithms.Relation.Line2Line', function() {
        it ('Parallel case (disjoint)', () => {
            let l1 = line( point(10,10), vector(1,1) );
            let l2 = line( l1.pt.translate(vector(10,10)), l1.norm );
            let de9im = relate(l1, l2);

            expect(de9im.I2E[0]).to.be.deep.equal(l1);
            expect(de9im.E2I[0]).to.be.deep.equal(l2);
            expect(disjoint(l1,l2)).to.be.true;
            expect(equal(l1,l2)).to.be.false;
            expect(intersect(l1,l2)).to.be.false;
            expect(touch(l1,l2)).to.be.false;
        });
        it ('Equal case', () => {
            let l1 = line( point(10,10), vector(1,1) );
            let l2 = line( point(10,10), vector(-1,-1) );

            expect(equal(l1,l2)).to.be.true;
            expect(intersect(l1,l2)).to.be.true;
            expect(disjoint(l1,l2)).to.be.false;
            expect(touch(l1,l2)).to.be.false;
        });
        it ('Intersection case', () => {
            let l1 = line( point(10,10), vector(1,1) );
            let l2 = line( point(20,20), vector(1,-1) );

            expect(equal(l1,l2)).to.be.false;
            expect(intersect(l1,l2)).to.be.true;
            expect(disjoint(l1,l2)).to.be.false;
            expect(touch(l1,l2)).to.be.false;
        });
    });
    describe('#Algorithms.Relation.Line2Circle', function() {
        it ('Disjoint case', () => {
            let l = line( point(10,10), vector(1,0) );
            let c = circle( point(0,0), 5 );

            expect(disjoint(l, c)).to.be.true;
            expect(equal(l, c)).to.be.false;
            expect(intersect(l, c)).to.be.false;
            expect(touch(l, c)).to.be.false;
        });
        it ('Touching case', () => {
            let l = line( point(10,10), vector(1,0) );
            let c = circle( point(0,0), 10 );

            expect(equal(l, c)).to.be.false;
            expect(intersect(l, c)).to.be.true;
            expect(disjoint(l, c)).to.be.false;
            expect(touch(l, c)).to.be.true;
        });
        it ('Intersection case', () => {
            let l = line( point(5,5), vector(1,0) );
            let c = circle( point(0,0), 10 );

            expect(equal(l, c)).to.be.false;
            expect(intersect(l, c)).to.be.true;
            expect(disjoint(l, c)).to.be.false;
            expect(touch(l, c)).to.be.false;
        });
    });
});