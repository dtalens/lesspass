var assert = chai.assert;

describe('LessPass v2', function () {
    describe('set of characters', function () {
        it('get default set of characters', function () {
            var setOfCharacters = LessPass._getSetOfCharacters();
            assert.equal(
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
                setOfCharacters
            );
            assert.equal(26 * 2 + 10 + 32, setOfCharacters.length);
        });
        it('get default set of characters with object', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({
                lowercase: true,
                uppercase: true,
                digits: true,
                symbols: false
            });
            assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', setOfCharacters);
            assert.equal(26 * 2 + 10, setOfCharacters.length);
        });
        it('get set of characters only lowercase', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({lowercase: true});
            assert.equal('abcdefghijklmnopqrstuvwxyz', setOfCharacters);
            assert.equal(26, setOfCharacters.length);
        });
        it('get set of characters only uppercase', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({uppercase: true});
            assert.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ', setOfCharacters);
            assert.equal(26, setOfCharacters.length);
        });
        it('get set of characters only digits', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({digits: true});
            assert.equal('0123456789', setOfCharacters);
            assert.equal(10, setOfCharacters.length);
        });
        it('get set of characters only symbols', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({symbols: true});
            assert.equal('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', setOfCharacters);
            assert.equal(32, setOfCharacters.length);
        });
        it('get set of characters concat two subsets', function () {
            var setOfCharacters = LessPass._getSetOfCharacters({lowercase: true, uppercase: true});
            assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', setOfCharacters);
            assert.equal(26 * 2, setOfCharacters.length);
        });
        it('get set of characters doesn\'t care of key order in options', function () {
            assert.equal(
                LessPass._getSetOfCharacters({digits: true, symbols: true}),
                LessPass._getSetOfCharacters({symbols: true, digits: true})
            );
        });
        it('generate one char per set of characters', function () {
            var oneCharPerSetOfCharacters = LessPass._generateOneCharPerSetOfCharacters(
                bigInt(26 * 26),
                {uppercase: true, lowercase: true}
            );
            assert.equal('aA', oneCharPerSetOfCharacters.value);
            assert.equal(2, oneCharPerSetOfCharacters.value.length);
            assert.equal(1, oneCharPerSetOfCharacters.entropy);
        });
        it('number set of characters', function () {
            assert.equal(1, LessPass._numberSubsetsOfChars({uppercase: true}));
            assert.equal(2, LessPass._numberSubsetsOfChars({uppercase: true, lowercase: true}));
            assert.equal(2, LessPass._numberSubsetsOfChars({uppercase: true, lowercase: true, symbols: false}));
            assert.equal(4, LessPass._numberSubsetsOfChars({
                lowercase: true,
                uppercase: true,
                symbols: true,
                digits: true
            }));
        });
    });
});